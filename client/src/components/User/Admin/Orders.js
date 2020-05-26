import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPayments } from '../../../actions/product';
import PaymentHistory from '../../utils/PaymentHistory';
import UserLayout from '../../../hoc/UserLayout';
import { withNamespaces } from 'react-i18next';

class SellRequest extends Component {
  componentDidMount() {
    this.props.getPayments();
  }

  render() {
    const { t } = this.props;
    return (
      <UserLayout>
        {this.props.products && this.props.products.payments ? (
          <div>
            <h4 className="page-title">{t('Orders')}</h4>
            <PaymentHistory payments={this.props.products.payments.payments} />
          </div>
        ) : null}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });
const mapDispatchToProps = (dispatch) => ({
  getPayments: () => dispatch(getPayments()),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(SellRequest)
);
