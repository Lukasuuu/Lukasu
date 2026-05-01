import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../src/components/screen-wrapper';
import { useAuthStore } from '../src/stores/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
    router.replace('/');
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold text-white mb-2">Entrar</Text>
        <Text className="text-surface-700 mb-8">Acesse sua conta BookMe</Text>

        <TextInput
          className="bg-surface-800 text-white rounded-xl px-4 py-3 mb-4"
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="bg-surface-800 text-white rounded-xl px-4 py-3 mb-6"
          placeholder="Senha"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-brand-600 rounded-xl py-4 items-center"
        >
          <Text className="text-white font-semibold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
