import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getSellRequests, reviewSellRequest } from '../../../actions/product';
import SellRequestHistory from '../../utils/sellRequestHistory';
import UserLayout from '../../../hoc/UserLayout';
import { withNamespaces } from 'react-i18next';

class SellRequest extends Component {
  componentDidMount() {
    this.props.getSellRequests();
  }

  render() {
    const { t } = this.props;
    return (
      <UserLayout>
        {this.props.products &&
        this.props.products.sellRequests &&
        this.props.products.sellRequests.requests ? (
          <div>
            <h4 className="page-title">{t('Sell requests')}</h4>
            <SellRequestHistory
              sellRequests={this.props.products.sellRequests.requests}
            />
          </div>
        ) : null}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });
const mapDispatchToProps = (dispatch) => ({
  getSellRequests: () => dispatch(getSellRequests()),
  reviewSellRequest: (id) => dispatch(reviewSellRequest(id)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(SellRequest)
);
