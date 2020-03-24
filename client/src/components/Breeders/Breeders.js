import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeders } from '../../actions/product';
import BreederTest from './BreederTest';
import _ from 'lodash';

class Breeders extends Component {
  componentDidMount() {
    this.props.getBreeders();
  }

  render() {
    return (
      <div>
        <BreederTest breeders={_.get(this.props.products, 'breeders', [])} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ products: state.product });

const mapDispatchToProps = dispatch => {
  return {
    getBreeders: () => dispatch(getBreeders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeders);
