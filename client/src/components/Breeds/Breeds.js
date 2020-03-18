import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeds } from '../../actions/product';
import _ from 'lodash';

class Breeds extends Component {
  componentDidMount() {
    this.props.getBreeds();
  }

  render() {
    const products = this.props.products;

    return (
      <div>
        {products &&
          products.breeds &&
          products.breeds.map((breed, i) => (
            <div key={breed._id}>
              <div>{breed.name}</div>
              <div>
                <img
                  src={_.get(
                    breed,
                    'images[0].url',
                    `/images/image_not_available.png`
                  )}
                  alt={breed.name}
                />
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ products: state.product });

const mapDispatchToProps = dispatch => {
  return {
    getBreeds: () => dispatch(getBreeds())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
