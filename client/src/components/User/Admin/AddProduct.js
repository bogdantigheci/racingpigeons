import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../utils/formfield';
import { connect } from 'react-redux';
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
} from '../../utils/formActions';
import {
  getBreeds,
  getBreeders,
  addProduct,
  clearProduct
} from '../../../actions/product';
import FileUpload from '../../utils/FileUpload';

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
          placeholder: 'Enter pigeon ring number'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter your price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      breeder: {
        element: 'select',
        value: '',
        config: {
          label: 'Breeder',
          name: 'breeder_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      breed: {
        element: 'select',
        value: '',
        config: {
          label: 'Breed',
          name: 'breed_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in stock',
          name: 'available_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },

      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showlabel: false
      }
    }
  };

  updateFields = newFormData => {
    this.setState({ formdata: newFormData });
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'products');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata);

    this.setState(
      {
        formdata: newFormData,
        formSuccess: true
      },
      () => {
        this.props.clearProduct();
      }
    );
    setTimeout(() => {
      this.setState({ formSuccess: false });
    }, 3000);
  };

  submitForm = event => {
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

  imagesHandler = images => {
    const newFormData = {
      ...this.state.formdata
    };

    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formdata: newFormData
    });
  };

  componentDidMount() {
    const formdata = this.state.formdata;
    this.props.getBreeders().then(response => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.breeders,
        'breeder'
      );
      this.updateFields(newFormData);
    });
    this.props.getBreeds().then(response => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.breeds,
        'breed'
      );
      this.updateFields(newFormData);
    });
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={event => this.submitForm(event)}>
            <FileUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={'ringId'}
              formdata={this.state.formdata.ringId}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'description'}
              formdata={this.state.formdata.description}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'price'}
              formdata={this.state.formdata.price}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider"></div>
            <FormField
              id={'breed'}
              formdata={this.state.formdata.breed}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'breeder'}
              formdata={this.state.formdata.breeder}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider"></div>
            <FormField
              id={'available'}
              formdata={this.state.formdata.available}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'shipping'}
              formdata={this.state.formdata.shipping}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={'publish'}
              formdata={this.state.formdata.publish}
              change={element => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={event => this.submitForm(event)}>
              Add Product
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.product };
};
const mapDispatchToProps = dispatch => {
  return {
    getBreeders: () => dispatch(getBreeders()),
    getBreeds: () => dispatch(getBreeds()),
    clearProduct: () => dispatch(clearProduct()),
    addProduct: dataToSubmit => dispatch(addProduct(dataToSubmit))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
