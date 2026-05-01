import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '../../src/components/screen-wrapper';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View className="px-4 py-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-brand-500 font-semibold">← Voltar</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white mb-2">Agendamento</Text>
        <Text className="text-surface-700 mb-4">ID: {id}</Text>
        <View className="bg-surface-800 rounded-xl p-4">
          <Text className="text-white">Detalhes do agendamento serão carregados aqui.</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
