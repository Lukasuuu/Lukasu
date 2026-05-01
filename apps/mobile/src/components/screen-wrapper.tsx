import { View } from 'react-native';
import type { ReactNode } from 'react';

export function ScreenWrapper({ children }: { children: ReactNode }) {
  return <View className="flex-1 bg-surface-900">{children}</View>;
}
