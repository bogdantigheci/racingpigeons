import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import translationRO from './components/utils/translations/ro/translation.json';
import translationEN from './components/utils/translations/en/translation.json';

const resources = {
  ro: {
    translation: translationRO,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(reactI18nextModule) 
  .init({
    resources,
    roLng: 'ro',
    enLng: 'en',

    keySeparator: false, 

    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
