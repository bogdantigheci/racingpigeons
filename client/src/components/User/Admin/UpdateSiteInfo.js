import React, { Component } from 'react';

import FormField from '../../utils/formfield';
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../../utils/formActions';

import { connect } from 'react-redux';
import { getSiteData, updateSiteData } from '../../../actions/site';
import { withNamespaces } from 'react-i18next';

class UpdateSiteNfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Adresss',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the site working hours',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone number',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the phone number',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Shop email',
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
        showlabel: true,
      },
    },
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'site_info');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'site_info');
    let formIsValid = isFormValid(this.state.formdata, 'site_info');

    if (formIsValid) {
      this.props.updateSiteData(dataToSubmit).then(() => {
        this.setState(
          {
            formSuccess: true,
          },
          () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false,
              });
            }, 2000);
          }
        );
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  componentDidMount() {
    this.props.getSiteData().then(() => {
      const newFormData = populateFields(
        this.state.formdata,
        this.props.site.siteData[0]
      );
      this.setState({
        formdata: newFormData,
      });
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <form onSubmit={(event) => this.submitForm(event)}>
          <h1>{t('App info')}</h1>
          <FormField
            id={'address'}
            formdata={this.state.formdata.address}
            change={(element) => this.updateForm(element)}
            label={t('Address')}
          />
          <FormField
            id={'hours'}
            formdata={this.state.formdata.hours}
            change={(element) => this.updateForm(element)}
            label={t('Working hours')}
          />
          <FormField
            id={'phone'}
            formdata={this.state.formdata.phone}
            change={(element) => this.updateForm(element)}
            label={t('Phone')}
          />
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
            label={t('Email')}
          />

          <div>
            {this.state.formSuccess ? (
              <div className="form_success">{t('Success')}</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">{t('Please check your data')}</div>
            ) : null}
            <button onClick={(event) => this.submitForm(event)}>
              {t('Update')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
});
const mapDispatchToProps = (dispatch) => ({
  getSiteData: () => dispatch(getSiteData()),
  updateSiteData: (dataToSubmit) => dispatch(updateSiteData(dataToSubmit)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(UpdateSiteNfo)
);
