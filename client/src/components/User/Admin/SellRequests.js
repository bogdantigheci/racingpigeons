import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSellRequests } from '../../../actions/product';

class SellRequests extends Component {
  componentDidMount() {
    this.props.getSellRequests();
  }
  render() {
    console.log('11111111111111111111111', this.props.products);
    return (
      <div className="container d-flex flex-wrap">
        {this.props.products && this.props.products.sellRequests
          ? this.props.products.sellRequests.requests.map((request, i) => (
              <div key={i} className="mr-5 mx-auto mb-5 club_race_card">
                <Link to={`/product/requests/${request._id}`}>
                  <img
                    className="club_race_card_image"
                    src={_.get(
                      request,
                      'images[0].url',
                      `/images/image_not_available.png`
                    )}
                    alt="race"
                  />
                </Link>
              </div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });
const mapDispatchToProps = (dispatch) => ({
  getSellRequests: (id) => dispatch(getSellRequests(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellRequests);
