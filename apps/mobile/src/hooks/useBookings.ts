import { useQuery } from '@tanstack/react-query';

interface Booking {
  id: string;
  customerEmail: string;
  customerName?: string;
  startTime: string;
  endTime: string;
  status: string;
}

export function useBookings() {
  return useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      // TODO: integrate with NestJS bookings endpoint
      return [
        { id: '1', customerEmail: 'ana@example.com', startTime: '2026-05-02T10:00:00Z', endTime: '2026-05-02T11:00:00Z', status: 'confirmed' },
        { id: '2', customerEmail: 'bruno@example.com', startTime: '2026-05-03T14:00:00Z', endTime: '2026-05-03T15:00:00Z', status: 'pending' },
      ];
    },
  });
}
