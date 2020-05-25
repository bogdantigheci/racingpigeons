import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import UpdatePersonalInfo from './UpdatePersonalInfo';
import { withNamespaces } from 'react-i18next';

const UpdateProfile = ({ t }) => {
  return (
    <UserLayout>
      <h1>{t('Profile')}</h1>
      <UpdatePersonalInfo />
    </UserLayout>
  );
};

export default withNamespaces()(UpdateProfile);
