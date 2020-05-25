import React, { Component } from 'react';
import FormField from '../utils/formfield';

import { connect } from 'react-redux';
import { updateUserData, clearUpdateUser } from '../../actions/user';
import { withNamespaces } from 'react-i18next';
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../utils/formActions';

class UpdatePersonalNfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your lastname',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
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
    const newFormdata = update(element, this.state.formdata, 'update_user');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'update_user');
    let formIsValid = isFormValid(this.state.formdata, 'update_user');

    if (formIsValid) {
      this.props.updateUserData(dataToSubmit).then(() => {
        if (this.props.user.updateUser.success) {
          this.setState(
            {
              formSuccess: true,
            },
            () => {
              setTimeout(() => {
                this.props.clearUpdateUser();
                this.setState({
                  formSuccess: false,
                });
              }, 2000);
            }
          );
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  componentDidMount() {
    const newFormData = populateFields(
      this.state.formdata,
      this.props.user.userData
    );
    this.setState({
      formdata: newFormData,
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <form onSubmit={(event) => this.submitForm(event)}>
          <h2>{t('Personal information')}</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
                placeholder={t('Name')}
              />
            </div>
            <div className="block">
              <FormField
                id={'lastname'}
                formdata={this.state.formdata.lastname}
                change={(element) => this.updateForm(element)}
                placeholder={t('last name')}
              />
            </div>
          </div>
          <div>
            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
              placeholder={t('Email')}
            />
          </div>
          <div>
            {this.state.formSuccess ? (
              <div className="form_success">{t('Success')}</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">{t('Please check your data')}</div>
            ) : null}
            <button onClick={(event) => this.submitForm(event)}>
              {t('Update personal info')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: (dataToSubmit) => dispatch(updateUserData(dataToSubmit)),
  clearUpdateUser: () => dispatch(clearUpdateUser()),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalNfo)
);
