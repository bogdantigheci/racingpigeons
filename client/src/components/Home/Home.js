import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import { connect } from 'react-redux';
import { getProductsByArrival } from '../../actions/product';
import CardBlock from '../utils/cardBlock';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          list={this.props.product.byArrival}
          title="New Pigeons on SALE!"
        />
        <HomePromotion />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(Home);
