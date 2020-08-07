import React from 'react';
import { withNamespaces } from 'react-i18next';
import Flag from 'react-world-flags';

const ChangeLanguage = ({ i18n }) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <React.Fragment>
      {i18n.language === 'en' ? (
        <Flag
          className="lang-button"
          onClick={() => changeLanguage('ro')}
          code="ro"
          height="16"
          width="24"
        />
      ) : (
        <Flag
          className="lang-button"
          onClick={() => changeLanguage('en')}
          code="gb"
          height="16"
          width="24"
        />
      )}
    </React.Fragment>
  );
};

export default withNamespaces()(ChangeLanguage);
