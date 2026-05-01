import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../src/components/screen-wrapper';
import { useBookings } from '../src/hooks/useBookings';

export default function HomeScreen() {
  const router = useRouter();
  const { data: bookings, isLoading } = useBookings();

  return (
    <ScreenWrapper>
      <SafeAreaView edges={['top']} className="px-4 py-6">
        <Text className="text-2xl font-bold text-white mb-4">Agendamentos</Text>
        {isLoading ? (
          <Text className="text-surface-700">Carregando...</Text>
        ) : (
          <FlatList
            data={bookings || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/booking/${item.id}`)}
                className="bg-surface-800 rounded-xl p-4 mb-3"
              >
                <Text className="text-white font-semibold">{item.customerEmail}</Text>
                <Text className="text-surface-700 text-sm">{item.startTime}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text className="text-surface-700">Nenhum agendamento encontrado.</Text>
            }
          />
        )}
      </SafeAreaView>
    </ScreenWrapper>
  );
}
