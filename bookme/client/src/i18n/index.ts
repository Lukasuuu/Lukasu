import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

import ptBR from './locales/pt-BR/common.json';
import en from './locales/en/common.json';
import es from './locales/es/common.json';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { common: ptBR },
      en: { common: en },
      es: { common: es },
    },
    fallbackLng: 'pt-BR',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  });

export default i18n;
