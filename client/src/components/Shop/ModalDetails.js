import React, { Component } from 'react';
import ProductBlock from '../utils/productBlock';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem } from '../../actions/user';
import _ from 'lodash';
import { withNamespaces } from 'react-i18next';
import { getRateRON } from '../../selectors/exchangeRate';

class ModalDetails extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.user, nextProps.user)) {
      let cartItems = [];
      let user = nextProps.user;

      if (user.userData.cart) {
        if (user.userData.cart.length > 0) {
          user.userData.cart.forEach((item) => {
            cartItems.push(item.id);
          });
          nextProps.getCartItems(cartItems, user.userData.cart).then(() => {
            if (
              nextProps.user.cartDetail &&
              nextProps.user.cartDetail.length > 0
            ) {
              this.calculateTotal(nextProps.user.cartDetail);
            }
          });
        }
      }
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true,
    });
  };

  removeFromCart = (id) => {
    this.props.removeCartItem(id).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false,
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="user_cart">
          <ProductBlock
            products={this.props.user}
            type="cart"
            removeItem={(id) => this.removeFromCart(id)}
            rateRON={this.props.rateRON}
          />
          {this.state.showTotal ? (
            <div>
              <div className="user_cart_sum">
                <div className="total_amount">
                  {t('Total amount')}: € {this.state.total}
                  {t('Total amount')}:
                  {(this.state.total * this.props.rateRON).toFixed(2)} Lei
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  products: state.product,
  rateRON: getRateRON(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCartItems: (cartItems, userCart) =>
    dispatch(getCartItems(cartItems, userCart)),
  removeCartItem: (id) => dispatch(removeCartItem(id)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(ModalDetails)
);
