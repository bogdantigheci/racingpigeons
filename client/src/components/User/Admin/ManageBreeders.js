import React, { Component } from 'react';

import FormField from '../../utils/formfield';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/formActions';

import { connect } from 'react-redux';
import { getBreeders, addBreeder } from '../../../actions/product';
import FileUpload from '../../utils/FileUpload';

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
          placeholder: 'Enter the breeder'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      club: {
        element: 'input',
        value: '',
        config: {
          name: 'club_input',
          type: 'text',
          placeholder: 'Enter the club'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      bio: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Breeder bio',
          name: 'bio_input',
          type: 'text',
          placeholder: 'Enter breeder bio'
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

  showCategoryItems = () =>
    this.props.products && this.props.products.breeders
      ? this.props.products.breeders.map((item, i) => (
          <div className="category_item" key={i}>
            {item && item.name}
          </div>
        ))
      : null;

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'breeders');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'breeders');

    this.setState({
      formdata: newFormData,
      formSuccess: true
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'breeders');
    let formIsValid = isFormValid(this.state.formdata, 'breeders');
    let existingBreeders = this.props.products.breeders;

    if (formIsValid) {
      this.props.addBreeder(dataToSubmit, existingBreeders).then(response => {
        if (response.payload.success) {
          this.resetFieldsHandler();
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true
      });
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
    this.props.getBreeders();
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Breeders</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="breeds_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FileUpload
                imagesHandler={images => this.imagesHandler(images)}
                reset={this.state.formSuccess}
              />
              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'club'}
                formdata={this.state.formdata.club}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'bio'}
                formdata={this.state.formdata.bio}
                change={element => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add breeder
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBreeders: () => dispatch(getBreeders()),
    addBreeder: (dataToSubmit, existingBreeds) =>
      dispatch(addBreeder(dataToSubmit, existingBreeds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBreeders);
