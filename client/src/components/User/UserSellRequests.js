import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSellRequests } from '../../actions/product';
import SellRequestHistory from '../utils/sellRequestHistory';
import UserLayout from '../../hoc/UserLayout';
import { withNamespaces } from 'react-i18next';

class UserSellRequest extends Component {
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
          <div className="user_nfo_panel">
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
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(UserSellRequest)
);
