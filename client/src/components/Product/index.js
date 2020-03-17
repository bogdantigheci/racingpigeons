import React, { Component } from 'react';
import ShopHeader from '../utils/shopHeader';
import { connect } from 'react-redux';
import ProductInfo from './ProductInfo';
import ProductImages from './ProductImages';
import { getProductDetail, clearProductDetail } from '../../actions/product';
import { addToCart } from '../../actions/user';
import _ from 'lodash';

class ProductDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductDetail(id).then(response => {
      if (!this.props.products.prodDetail) {
        this.props.history.push('/page_not_found');
      }
    });
  }

  componentWillMount() {
    this.props.clearProductDetail();
  }
  //don't add duplicate pigeon in cart
  addToCartHandler = id => {
    const isInCart = _.find(
      _.map(this.props.cartDetail, item => item.id === id)
    );
    if (!isInCart) {
      this.props.addToCart(id);
    }
  };

  render() {
    // console.log(
    //   '2222222222222222222222this.props.match.params.id',
    //   this.props.products.prodPosts
    // );
    // console.log(
    //   'sadasdasdadsadad',
    //   _.get(this.props.products, 'prodDetail._id')
    // );
    return (
      <div>
        <ShopHeader title="Product detail" />
        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: '500px' }}>
                  <ProductImages detail={this.props.products.prodDetail} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.prodDetail}
                  comments={_.get(
                    this.props.products,
                    'prodDetail.comments',
                    []
                  )}
                />
              </div>
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.product, cartDetail: state.user.userData.cart };
};
const mapDispatchToProps = dispatch => {
  return {
    getProductDetail: id => dispatch(getProductDetail(id)),
    clearProductDetail: () => dispatch(clearProductDetail()),
    addToCart: id => dispatch(addToCart(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
