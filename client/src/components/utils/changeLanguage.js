import React from 'react';
import { withNamespaces } from 'react-i18next';
import Flag from 'react-world-flags';

const ChangeLanguage = ({ i18n }) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <React.Fragment>
      <button className="lang-button" onClick={() => changeLanguage('ro')}>
        <Flag code="ro" height="16" />
      </button>
      <button className="lang-button" onClick={() => changeLanguage('en')}>
        <Flag code="gb" height="16" />
      </button>
    </React.Fragment>
  );
};

export default withNamespaces()(ChangeLanguage);
