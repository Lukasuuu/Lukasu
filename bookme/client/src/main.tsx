import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import './i18n';
import { queryClient } from './lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Register Service Worker for PWA (only in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('[BookMe] SW registered:', reg.scope);
      })
      .catch((err) => console.warn('[BookMe] SW registration failed:', err));
  });
}
