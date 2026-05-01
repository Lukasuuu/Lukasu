import { describe, it, expect } from 'vitest';
import { useUIStore } from './uiStore';

describe('uiStore', () => {
  it('should have default state', () => {
    const state = useUIStore.getState();
    expect(state.sidebarOpen).toBe(false);
    expect(state.theme).toBe('dark');
    expect(state.language).toBe('pt-BR');
  });

  it('should toggle sidebar', () => {
    useUIStore.getState().setSidebarOpen(true);
    expect(useUIStore.getState().sidebarOpen).toBe(true);
    useUIStore.getState().setSidebarOpen(false);
    expect(useUIStore.getState().sidebarOpen).toBe(false);
  });

  it('should set theme', () => {
    useUIStore.getState().setTheme('dark');
    expect(useUIStore.getState().theme).toBe('dark');
    useUIStore.getState().setTheme('light');
    expect(useUIStore.getState().theme).toBe('light');
  });

  it('should set language', () => {
    useUIStore.getState().setLanguage('en');
    expect(useUIStore.getState().language).toBe('en');
  });
});
