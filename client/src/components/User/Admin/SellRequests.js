import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getSellRequests } from '../../../actions/product';
import SellRequestHistory from '../../utils/sellRequestHistory';
import UserLayout from '../../../hoc/UserLayout';

class SellRequest extends Component {
  componentDidMount() {
    this.props.getSellRequests();
  }
  render() {
    return (
      <UserLayout>
        {this.props.products &&
        this.props.products.sellRequests &&
        this.props.products.sellRequests.requests ? (
          <SellRequestHistory
            sellRequests={this.props.products.sellRequests.requests}
          />
        ) : null}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });
const mapDispatchToProps = (dispatch) => ({
  getSellRequests: () => dispatch(getSellRequests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellRequest);
