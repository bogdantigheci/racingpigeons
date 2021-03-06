import React, { Component } from 'react';
import UserLayout from '../../hoc/UserLayout';
import ProductBlock from '../utils/productBlock';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import Paypal from '../utils/payPal';
import { withNamespaces } from 'react-i18next';
import { getRateRON } from '../../selectors/exchangeRate';

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        this.props.getCartItems(cartItems, user.userData.cart).then(() => {
          if (this.props.user.cartDetail.length > 0) {
            this.calculateTotal(this.props.user.cartDetail);
          }
        });
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

  showNoItemMessage = (message) => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>{message}</div>
    </div>
  );

  transactionError = (data) => {
    console.log('Paypal error');
  };
  transactionCancel = (data) => {
    console.log('Transaction cancelled');
  };
  transactionSuccess = (data) => {
    this.props
      .onSuccessBuy({
        cartDetail: this.props.user.cartDetail,
        paymentData: data,
      })
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true,
          });
        }
      });
  };

  render() {
    const { t } = this.props;
    return (
      <UserLayout>
        <div>
          <h1>{t('My cart')}</h1>
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
                    <div>
                      {t('Total amount')}:{' '}
                      {(this.state.total * this.props.rateRON).toFixed(2)} Lei
                    </div>
                  </div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div>{t('THANK YOU')}</div>
                <div>{t('YOUR ORDER IS NOW COMPLETE')}</div>
              </div>
            ) : (
              this.showNoItemMessage(t('Your cart is empty'))
            )}
          </div>

          <div
            className={
              !this.state.showTotal
                ? ' paypal_button_container payhidden'
                : 'paypal_button_container'
            }
          >
            <Paypal
              toPay={this.state.total}
              transactionError={(data) => this.transactionError(data)}
              transactionCancel={(data) => this.transactionCancel(data)}
              onSuccess={(data) => this.transactionSuccess(data)}
            />
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  products: state.product,
  rateRON: getRateRON(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems: (cartItems, userCart) =>
      dispatch(getCartItems(cartItems, userCart)),
    removeCartItem: (id) => dispatch(removeCartItem(id)),
    onSuccessBuy: (data) => dispatch(onSuccessBuy(data)),
  };
};

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(UserCart)
);
