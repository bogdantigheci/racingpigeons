import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeds } from '../../actions/product';
// import Breed from './Breed';
import BreedCard from './BreedCard';
import _ from 'lodash';

class Breeds extends Component {
  componentDidMount() {
    this.props.getBreeds();
  }

  render() {
    return (
      <div>
        {/* <Breed breeds={_.get(this.props.products, 'breeds', [])} /> */}
        <BreedCard breeds={_.get(this.props.products, 'breeds', [])} />
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
