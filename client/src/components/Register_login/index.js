import React from 'react';
import MyButton from '../utils/button';
import Login from './Login';
import { withNamespaces } from 'react-i18next';

const RegisterLogin = (props) => {
  const { t } = props;
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h2>{t('New Customers')}</h2>
            <p>
              {t(
                'Want to buy your favorite pigeon races, discuss, or just look for any other pigeon related info and you do not have an accout?'
              )}
            </p>
            <MyButton
              type="default"
              title={t('Create an account')}
              linkTo="/register"
              addStyles={{
                margin: '5px 0 0 0',
              }}
            />
          </div>
          <div className="right">
            <h2>{t('Registered customers')}</h2>
            <p>{t('If you have an account please log in.')}</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(RegisterLogin);
