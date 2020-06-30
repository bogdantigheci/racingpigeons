import React, { Component } from 'react';
import FormField from '../../utils/formfield';
import UserLayout from '../../../hoc/UserLayout';
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from '../../utils/formActions';

import { connect } from 'react-redux';
import { getRaces, addRace } from '../../../actions/product';
import FileUpload from '../../utils/FileUpload';
import { withNamespaces } from 'react-i18next';

class ManageBreeders extends Component {
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
          placeholder: 'Enter race name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      county: {
        element: 'input',
        value: '',
        config: {
          name: 'county_input',
          type: 'text',
          placeholder: 'Enter county',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      club: {
        element: 'input',
        value: '',
        config: {
          name: 'club_input',
          type: 'text',
          placeholder: 'Enter the club',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      details: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Race details',
          name: 'details_input',
          type: 'text',
          placeholder: 'Enter race details',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showlabel: false,
      },
      contestants: {
        element: 'input',
        value: '',
        config: {
          name: 'contestants_input',
          type: 'text',
          placeholder: 'Enter contestants list split by comma (ex: a, b, c)',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
    },
  };

  showCategoryItems = () =>
    this.props.products && this.props.products.races
      ? this.props.products.races.map((item, i) => (
          <div className="category_item" key={i}>
            {item && item.name}
          </div>
        ))
      : null;

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'races');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'races');

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'races');
    let formIsValid = isFormValid(this.state.formdata, 'races');
    let existingRaces = this.props.products.breeders;
    const contestants = dataToSubmit.contestants.split(',');
    if (formIsValid) {
      this.props
        .addRace({ ...dataToSubmit, contestants }, existingRaces)
        .then((response) => {
          if (response.payload.success) {
            this.resetFieldsHandler();
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
  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formdata,
    };

    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formdata: newFormData,
    });
  };

  componentDidMount() {
    this.props.getRaces();
  }

  render() {
    const { t } = this.props;
    return (
      <UserLayout>
        {this.props.user.userData.isAdmin ? (
          <div className="admin_category_wrapper">
            <h1>{t('Races')}</h1>
            <div className="admin_two_column">
              <div className="left">
                <div className="breeds_container">
                  {this.showCategoryItems()}
                </div>
              </div>
              <div className="right">
                <form onSubmit={(event) => this.submitForm(event)}>
                  <FileUpload
                    imagesHandler={(images) => this.imagesHandler(images)}
                    reset={this.state.formSuccess}
                  />
                  <FormField
                    id={'name'}
                    formdata={this.state.formdata.name}
                    change={(element) => this.updateForm(element)}
                    placeholder={t('Full name')}
                    label={t('Full name')}
                  />
                  <FormField
                    id={'county'}
                    formdata={this.state.formdata.county}
                    change={(element) => this.updateForm(element)}
                    placeholder={t('Enter county')}
                    label={t('County')}
                  />
                  <FormField
                    id={'club'}
                    formdata={this.state.formdata.club}
                    change={(element) => this.updateForm(element)}
                    placeholder={t('Club')}
                    label={t('Club')}
                  />
                  <FormField
                    id={'contestants'}
                    formdata={this.state.formdata.contestants}
                    change={(element) => this.updateForm(element)}
                    placeholder={t('Enter contestants split by comma')}
                    label={t('Contestants')}
                  />
                  <FormField
                    id={'details'}
                    formdata={this.state.formdata.details}
                    change={(element) => this.updateForm(element)}
                    label={t('Race details')}
                    placeholder={t('Race details')}
                  />
                  {this.state.formSuccess ? (
                    <div className="form_success">{t('Success')}</div>
                  ) : null}
                  {this.state.formError ? (
                    <div className="error_label">
                      {t('Please check your data')}
                    </div>
                  ) : null}
                  <button onClick={(event) => this.submitForm(event)}>
                    {t('Add Race')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="not_allowed_here">
            {t('You are not allowed here')}
          </div>
        )}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  getRaces: () => dispatch(getRaces()),
  addRace: (dataToSubmit, existingRaces) =>
    dispatch(addRace(dataToSubmit, existingRaces)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(ManageBreeders)
);
