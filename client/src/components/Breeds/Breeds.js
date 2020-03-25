import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeds } from '../../actions/product';
import Breed from './Breed';
import _ from 'lodash';

class Breeds extends Component {
  componentDidMount() {
    this.props.getBreeds();
  }

  render() {
    return (
      <div>
        <h5 className="section-title h1">Breeds</h5>
        <Breed breeds={_.get(this.props.products, 'breeds', [])} />
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
