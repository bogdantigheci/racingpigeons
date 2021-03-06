import React, { Component } from 'react';
import FormField from '../utils/formfield';
import { update, generateData, isFormValid } from '../utils/formActions';
import axios from 'axios';
import { withNamespaces } from 'react-i18next';

class ResetUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
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
    },
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'reset_email');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'reset_email');
    let formIsValid = isFormValid(this.state.formdata, 'reset_email');

    if (formIsValid) {
      axios.post('/api/users/reset_user', dataToSubmit).then((response) => {
        if (response.data.success) {
          this.setState({ formSuccess: true });
        } else {
          this.setState({ formError: true });
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
      <div className="container">
        <h1 className="reset_pass_h">{t('Reset password')}</h1>
        <form
          className="reset_pass"
          onSubmit={(event) => this.submitForm(event)}
        >
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
            placeholder={t('Enter your email')}
          />

          {this.state.formSuccess ? (
            <div className="form_success">{t('Done, check your email')}</div>
          ) : null}

          {this.state.formError ? (
            <div className="error_label">{t('Please check your data')}</div>
          ) : null}
          <button
            className="btn btn-primary"
            onClick={(event) => this.submitForm(event)}
          >
            {t('Send request')}
          </button>
        </form>
      </div>
    );
  }
}
export default withNamespaces()(ResetUser);
