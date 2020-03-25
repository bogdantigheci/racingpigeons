import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeders } from '../../actions/product';
import Breeder from './Breeder';
import _ from 'lodash';

class Breeders extends Component {
  componentDidMount() {
    this.props.getBreeders();
  }

  handlePlacements = placements => {
    placements = placements.split(',');
    return placements;
  };

  render() {
    return (
      <div>
        <h5 className="section-title h1">Breeders</h5>
        <Breeder breeders={_.get(this.props.products, 'breeders', [])} />
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
