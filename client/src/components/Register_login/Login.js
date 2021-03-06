import React, { Component } from 'react';
import FormField from '../utils/formfield';
import { update, generateData, isFormValid } from '../utils/formActions';
import { withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user';

class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        if (response.payload.loginSuccess) {
          this.props.history.push('/');
        } else {
          this.setState({
            formError: true,
          });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
            placeholder={t('Enter your email')}
          />

          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
            placeholder={t('Enter your password')}
          />

          {this.state.formError ? (
            <div className="error_label">{t('Please check your data')}</div>
          ) : null}
          <div
            className="login_button"
            onClick={(event) => this.submitForm(event)}
          >
            {t('Log in')}
          </div>
        </form>
        <div
          className="forgot_pass"
          onClick={() => this.props.history.push('/reset_user')}
        >
          {t('Forgot your password?')}
        </div>
      </div>
    );
  }
}

export default withNamespaces()(connect()(withRouter(Login)));
