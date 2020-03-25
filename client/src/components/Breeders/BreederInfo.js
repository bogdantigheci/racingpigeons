import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeder } from '../../actions/product';
import _ from 'lodash';

class BreederInfo extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getBreeder(id).then(response => {
      if (!this.props.products.breeder) {
        this.props.history.push('/page_not_found');
      }
    });
  }
  render() {
    console.log('prooooooooooops', this.props);

    return this.props.products && this.props.products.breeder ? (
      <div className="container">
        <img
          src={_.get(
            this.props.products.breeder,
            'images[0].url',
            `/images/image_not_available.png`
          )}
          alt="name"
        />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({ products: state.product });
const mapDispatchToProps = dispatch => ({
  getBreeder: id => dispatch(getBreeder(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(BreederInfo);
