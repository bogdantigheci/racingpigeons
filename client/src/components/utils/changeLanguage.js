import React from 'react';
import { withNamespaces } from 'react-i18next';

const ChangeLanguage = ({ i18n }) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <React.Fragment>
      <button onClick={() => changeLanguage('ro')}>ro</button>
      <button onClick={() => changeLanguage('en')}>en</button>
    </React.Fragment>
  );
};

export default withNamespaces()(ChangeLanguage);
