import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, Profile, Business } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: Profile | null;
  business: Business | null;
  loading: boolean;
  signUp: (email: string, password: string, businessName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Profile | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const initialCheckDone = useRef(false);
  const lastSessionToken = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfileAndBusiness = async (session: Session) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!isMounted) return;

      if (profile) {
        setUser(profile);
        if (profile.business_id) {
          const { data: businessData } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', profile.business_id)
            .single();
          if (isMounted && businessData) {
            setBusiness(businessData);
          }
        } else {
          setBusiness(null);
        }
      } else {
        setUser(null);
        setBusiness(null);
      }
    };

    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        setSession(session);
        lastSessionToken.current = session?.access_token || null;

        if (session) {
          await fetchProfileAndBusiness(session);
        } else {
          setUser(null);
          setBusiness(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
          initialCheckDone.current = true;
        }
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        const newToken = session?.access_token || null;
        // Always process SIGNED_IN events; skip only redundant TOKEN_REFRESHED
        const isRedundant = initialCheckDone.current && newToken === lastSessionToken.current && (event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION');
        if (isRedundant) {
          return;
        }
        lastSessionToken.current = newToken;
        setSession(session);

        if (session) {
          await fetchProfileAndBusiness(session);
        } else {
          setUser(null);
          setBusiness(null);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, businessName: string) => {
    try {
      // Sign up user
      const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!authUser) throw new Error('User creation failed');

      // Create business
      const slug = businessName.toLowerCase().replace(/\s+/g, '-');
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .insert([
          {
            user_id: authUser.id,
            name: businessName,
            slug,
            email,
          },
        ])
        .select()
        .single();

      if (businessError) throw businessError;

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authUser.id,
            business_id: businessData.id,
            name: businessName,
            email,
            role: 'owner',
          },
        ]);

      if (profileError) throw profileError;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    // onAuthStateChange (SIGNED_IN) will fetch profile/business
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setBusiness(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      session,
      user,
      business,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
    }),
    [session, user, business, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
