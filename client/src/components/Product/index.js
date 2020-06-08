import React, { Component } from 'react';
import ShopHeader from '../utils/shopHeader';
import { connect } from 'react-redux';
import ProductInfo from './ProductInfo';
import ProductImages from './ProductImages';
import { getProductDetail, clearProductDetail } from '../../actions/product';
import { addToCart } from '../../actions/user';
import ProdComments from './ProdComments/ProdComments';
import _ from 'lodash';
import ShopModal from '../Shop/Modal';
import { withNamespaces } from 'react-i18next';
import { getRateRON } from '../../selectors/exchangeRate';

class ProductDetail extends Component {
  state = {
    modalShow: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductDetail(id).then((response) => {
      if (!this.props.products.prodDetail) {
        this.props.history.push('/page_not_found');
      }
    });
  }

  componentWillMount() {
    this.props.clearProductDetail();
  }
  addToCartHandler = (id) => {
    const isInCart = _.find(
      _.map(this.props.cartDetail, (item) => item.id === id)
    );
    if (!isInCart) {
      this.props.addToCart(id);
    }
    this.setModalShow();
  };

  setModalShow = () => {
    this.setState({
      modalShow: !this.state.modalShow,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <ShopHeader title={t('Pigeon details')} />
        <ShopModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow()}
          prodauth={this.props.auth ? 1 : 0}
          exchangeRate={1}
        />
        <div className="container d-flex">
          {this.props.products.prodDetail ? (
            <div style={{ width: '100%' }}>
              <div className="product_detail_wrapper prod_details_comments">
                <div className="left">
                  <div>
                    <ProductImages detail={this.props.products.prodDetail} />
                  </div>
                </div>
                <div className="right">
                  <ProductInfo
                    addToCart={(id) => this.addToCartHandler(id)}
                    detail={this.props.products.prodDetail}
                    comments={_.get(
                      this.props.products,
                      'prodDetail.comments',
                      []
                    )}
                    rateRON={this.props.rateRON}
                  />
                </div>
              </div>
              <ProdComments
                comments={this.props.products.prodDetail.comments}
                prodId={this.props.products.prodDetail._id}
              />
            </div>
          ) : (
            t('Loading...')
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product,
    cartDetail: state.user.userData.cart,
    auth: state.user.userData.isAuth,
    rateRON: getRateRON(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  getProductDetail: (id) => dispatch(getProductDetail(id)),
  clearProductDetail: () => dispatch(clearProductDetail()),
  addToCart: (id) => dispatch(addToCart(id)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
