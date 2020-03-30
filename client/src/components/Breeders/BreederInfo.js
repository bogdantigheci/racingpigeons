import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeder } from '../../actions/product';
import _ from 'lodash';

class BreederInfo extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getBreeder(id).then(response => {
      if (!this.props.products.breeder) {
        this.props.history.push('/page_not_found');
      }
    });
  }
  render() {
    return (
      <div>
        <div>
          <div className="page-title">
            <h1>{_.get(this.props.products.breeder, 'name', '')}</h1>
          </div>
        </div>
        {this.props.products && this.props.products.breeder ? (
          <div className="container d-flex flex-wrap">
            <div className="d-flex flex-wrap breeder_info_container">
              <div className="breeder_info_image_container">
                <img
                  className="img-fluid rounded float-left breeder_info_image"
                  src={_.get(
                    this.props.products.breeder,
                    'images[0].url',
                    `/images/image_not_available.png`
                  )}
                  alt="name"
                />
              </div>
              <div
                className={
                  window.innerWidth > 768
                    ? 'breeder_placements'
                    : 'container breeder_placements'
                }
              >
                <h5 className="placements-title">Placements</h5>
                <div className="container placements_detail">
                  {_.get(this.props.products.breeder, 'placements', '').map(
                    (placement, i) => (
                      <div key={i}>{placement}</div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <h5 className="bio_title">Bio</h5>
              <div className="bio container">
                {_.get(this.props.products.breeder, 'bio', '')}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({ products: state.product });
const mapDispatchToProps = dispatch => ({
  getBreeder: id => dispatch(getBreeder(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(BreederInfo);
