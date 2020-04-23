import React, { Component } from 'react';

import FormField from '../../utils/formfield';
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from '../../utils/formActions';

import { connect } from 'react-redux';
import { getRaces, addRace } from '../../../actions/product';
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
          placeholder: 'Enter race name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
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
          placeholder: 'Enter contestants',
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
    return (
      <div className="admin_category_wrapper">
        <h1>Races</h1>
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
              />
              <FormField
                id={'club'}
                formdata={this.state.formdata.club}
                change={(element) => this.updateForm(element)}
              />
              <FormField
                id={'contestants'}
                formdata={this.state.formdata.contestants}
                change={(element) => this.updateForm(element)}
              />
              <FormField
                id={'details'}
                formdata={this.state.formdata.details}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                Add Race
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
  getRaces: () => dispatch(getRaces()),
  addRace: (dataToSubmit, existingRaces) =>
    dispatch(addRace(dataToSubmit, existingRaces)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageBreeders);
