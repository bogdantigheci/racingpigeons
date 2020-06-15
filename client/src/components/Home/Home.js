import React from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import { connect } from 'react-redux';
import { getProductsByArrival } from '../../actions/product';
import CardBlock from '../utils/cardBlock';
import { withNamespaces } from 'react-i18next';

const Home = ({ getProductsByArrival, t, products }) => {
  React.useEffect(() => {
    getProductsByArrival();
  }, [getProductsByArrival]);

  return (
    <div>
      <HomeSlider />
      <CardBlock list={products.byArrival} title={t('New Pigeons on SALE!')} />
      <HomePromotion />
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  getProductsByArrival: () => dispatch(getProductsByArrival()),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
