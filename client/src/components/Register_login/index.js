import React from 'react';
import MyButton from '../utils/button';
import Login from './Login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h2>New Customers</h2>
            <p>
              Want to buy your favorite pigeon races, discuss, or just look for
              any other pigeon related info and you don't have an accout?
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '5px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
