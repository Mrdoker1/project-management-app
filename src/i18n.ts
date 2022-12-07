import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/translate';
import store from 'store/store';

i18n.use(initReactI18next).init({
  resources,
  lng: store.getState().settings.lang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
