import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import translationRO from './components/utils/translations/ro/translation.json';
import translationEN from './components/utils/translations/en/translation.json';

// the translations
const resources = {
  ro: {
    translation: translationRO,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    roLng: 'ro',
    enLng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
