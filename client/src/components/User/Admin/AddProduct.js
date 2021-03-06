import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../utils/formfield';
import { connect } from 'react-redux';
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields,
} from '../../utils/formActions';
import {
  getBreeds,
  getBreeders,
  addProduct,
  clearProduct,
} from '../../../actions/product';
import FileUpload from '../../utils/FileUpload';
import { withNamespaces } from 'react-i18next';

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      ringId: {
        element: 'input',
        value: '',
        config: {
          label: 'Ring ID',
          name: 'ringId_input',
          type: 'text',
          placeholder: 'Enter pigeon ring number',
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
          label: 'Pigeon description',
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
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Pigeon price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter price',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      breeder: {
        element: 'select',
        value: '',
        config: {
          label: 'Breeder',
          name: 'breeder_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      breed: {
        element: 'select',
        value: '',
        config: {
          label: 'Breed',
          name: 'breed_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in stock',
          name: 'available_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true,
      },

      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' },
          ],
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

  updateFields = (newFormData) => {
    this.setState({ formdata: newFormData });
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'products');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata);

    this.setState(
      {
        formdata: newFormData,
        formSuccess: true,
      },
      () => {
        this.props.clearProduct();
      }
    );
    setTimeout(() => {
      this.setState({ formSuccess: false });
    }, 3000);
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if (formIsValid) {
      this.props.addProduct(dataToSubmit).then(() => {
        if (this.props.products.addProduct.success) {
          this.resetFieldHandler();
        }
      });
    } else {
      this.setState({ formError: true });
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
    const formdata = this.state.formdata;
    this.props.getBreeders().then((response) => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.breeders,
        'breeder'
      );
      this.updateFields(newFormData);
    });
    this.props.getBreeds().then((response) => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.breeds,
        'breed'
      );
      this.updateFields(newFormData);
    });
  }

  render() {
    const { t } = this.props;

    return (
      <UserLayout>
        {this.props.user.userData.isAdmin ? (
          <div>
            <h1>{t('Add product')}</h1>
            <form onSubmit={(event) => this.submitForm(event)}>
              <FileUpload
                imagesHandler={(images) => this.imagesHandler(images)}
                reset={this.state.formSuccess}
              />
              <FormField
                id={'ringId'}
                formdata={this.state.formdata.ringId}
                change={(element) => this.updateForm(element)}
                placeholder={t('Enter ring ID')}
                label={t('Ring ID')}
              />
              <FormField
                id={'description'}
                formdata={this.state.formdata.description}
                change={(element) => this.updateForm(element)}
                placeholder={t('Enter your description')}
                label={t('Pigeon description')}
              />
              <FormField
                id={'price'}
                formdata={this.state.formdata.price}
                change={(element) => this.updateForm(element)}
                placeholder={t('Enter price')}
                label={t('Price')}
              />
              <div className="form_devider"></div>
              <FormField
                id={'breed'}
                formdata={this.state.formdata.breed}
                change={(element) => this.updateForm(element)}
                label={t('Breed')}
              />
              <FormField
                id={'breeder'}
                formdata={this.state.formdata.breeder}
                change={(element) => this.updateForm(element)}
                label={t('Breeder')}
              />
              <div className="form_devider"></div>
              <FormField
                id={'available'}
                formdata={this.state.formdata.available}
                change={(element) => this.updateForm(element)}
                label={t('Available, in stock')}
              />
              <FormField
                id={'shipping'}
                formdata={this.state.formdata.shipping}
                change={(element) => this.updateForm(element)}
                label={t('Shipping')}
              />

              <FormField
                id={'publish'}
                formdata={this.state.formdata.publish}
                change={(element) => this.updateForm(element)}
                label={t('Publish')}
              />

              {this.state.formSuccess ? (
                <div className="form_success">{t('Success')}</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">{t('Please check your data')}</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                {t('Add product')}
              </button>
            </form>
          </div>
        ) : (
          <div className='not_allowed_here'>{t('You are not allowed here')}</div>
        )}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  getBreeders: () => dispatch(getBreeders()),
  getBreeds: () => dispatch(getBreeds()),
  clearProduct: () => dispatch(clearProduct()),
  addProduct: (dataToSubmit) => dispatch(addProduct(dataToSubmit)),
});
export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct)
);
