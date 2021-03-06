import React, { Component } from 'react';

import FormField from '../../utils/formfield';
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from '../../utils/formActions';
import { withNamespaces } from 'react-i18next';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getBreeds, addBreed } from '../../../actions/product';
import FileUpload from '../../utils/FileUpload';

class ManageBreeds extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter the breed',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description',
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
    },
  };

  showCategoryItems = () =>
    _.get(this.props, 'products.breeds')
      ? this.props.products.breeds.map((item) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'breeds');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'breeds');

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'breeds');
    let formIsValid = isFormValid(this.state.formdata, 'breeds');
    let existingBreeds = this.props.products.breeds;

    if (formIsValid) {
      this.props.addBreed(dataToSubmit, existingBreeds).then((response) => {
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
    this.props.getBreeds();
  }

  render() {
    const { t } = this.props;
    return (
      <div className="admin_category_wrapper">
        <h1>{t('Breeds')}</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="breeds_container">{this.showCategoryItems()}</div>
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
                id={'description'}
                formdata={this.state.formdata.description}
                change={(element) => this.updateForm(element)}
                placeholder={t('Description')}
                label={t('Description')}
              />
              {this.state.formSuccess ? (
                <div className="form_success">{t('Success')}</div>
              ) : null}
              {this.state.formError ? (
                <div className="error_label">{t('Please check your data')}</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                {t('Add breed')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  getBreeds: () => dispatch(getBreeds()),
  addBreed: (dataToSubmit, existingBreeds) =>
    dispatch(addBreed(dataToSubmit, existingBreeds)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(ManageBreeds)
);
