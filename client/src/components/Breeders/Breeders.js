import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeders } from '../../actions/product';

class Breeders extends Component {
  componentDidMount() {
    this.props.getBreeders();
  }

  render() {
    const products = this.props.products;

    return (
      <div>
        {products.breeders.map((breeder, i) => (
          <div key={breeder._id}>{breeder.name}</div>
        ))}
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
