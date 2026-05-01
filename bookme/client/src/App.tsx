import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation } from 'wouter';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import OnboardingWizard from './components/OnboardingWizard';
import CookieConsent from './components/CookieConsent';

// Eagerly load critical pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Lazy load all other pages to reduce initial bundle size
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Clients = lazy(() => import('./pages/Clients'));
const Services = lazy(() => import('./pages/Services'));
const Staff = lazy(() => import('./pages/Staff'));
const Settings = lazy(() => import('./pages/Settings'));
const Billing = lazy(() => import('./pages/Billing'));
const Reports = lazy(() => import('./pages/Reports'));
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));
const CheckoutCancel = lazy(() => import('./pages/CheckoutCancel'));
const PublicBooking = lazy(() => import('./pages/PublicBooking'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-foreground/70">A carregar...</p>
      </div>
    </div>
  );
}

function PageLoader({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { session, loading } = useAuth();
  const [, navigate] = useLocation();

  if (loading) return <LoadingScreen />;

  if (!session) {
    navigate('/login');
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/about">
        <PageLoader><About /></PageLoader>
      </Route>
      <Route path="/contact">
        <PageLoader><Contact /></PageLoader>
      </Route>
      <Route path="/privacy-policy">
        <PageLoader><PrivacyPolicy /></PageLoader>
      </Route>
      <Route path="/terms-and-conditions">
        <PageLoader><TermsAndConditions /></PageLoader>
      </Route>
      <Route path="/book/:businessSlug">
        <PageLoader><PublicBooking /></PageLoader>
      </Route>

      <Route path="/forgot-password">
        <PageLoader><ForgotPassword /></PageLoader>
      </Route>
      <Route path="/reset-password">
        <PageLoader><ResetPassword /></PageLoader>
      </Route>

      {/* Checkout */}
      <Route path="/checkout/success">
        <PageLoader><CheckoutSuccess /></PageLoader>
      </Route>
      <Route path="/checkout/cancel">
        <PageLoader><CheckoutCancel /></PageLoader>
      </Route>

      {/* Protected */}
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/dashboard/calendar" component={() => <ProtectedRoute component={Calendar} />} />
      <Route path="/dashboard/clients" component={() => <ProtectedRoute component={Clients} />} />
      <Route path="/dashboard/services" component={() => <ProtectedRoute component={Services} />} />
      <Route path="/dashboard/staff" component={() => <ProtectedRoute component={Staff} />} />
      <Route path="/dashboard/settings" component={() => <ProtectedRoute component={Settings} />} />
      <Route path="/dashboard/billing" component={() => <ProtectedRoute component={Billing} />} />
      <Route path="/dashboard/reports" component={() => <ProtectedRoute component={Reports} />} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <OnboardingProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              <CookieConsent />
              <OnboardingWizard />
            </TooltipProvider>
          </OnboardingProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
