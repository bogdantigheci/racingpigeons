import React, { Component } from 'react';
import ShopHeader from '../utils/shopHeader';
import { connect } from 'react-redux';
import {
  getBreeders,
  getBreeds,
  getProductsToShop
} from '../../actions/product';
import CollapseCheckbox from '../utils/collapseCheckbox';
import CollapseRadio from '../utils/collapseRadio';
import { price } from '../../constants/filterCategories';
import LoadMoreCards from './loadMoreCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      breed: [],
      breeder: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.getBreeders();
    this.props.getBreeds();
    this.props.getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    );
  }
  handlePrice = value => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  showFilteredResults = filters => {
    this.props.getProductsToShop(0, this.state.limit, filters).then(() => {
      this.setState({
        skip: 0
      });
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .getProductsToShop(
        skip,
        this.state.limit,
        this.state.filters,
        this.props.products.toShop
      )
      .then(() => {
        this.setState({
          skip
        });
      });
  };
  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
    });
  };

  render() {
    // console.log('asdasdasdad', this.state.filters);
    const products = this.props.products;
    return (
      <div>
        <ShopHeader title="Browse Products" />
        <div className="container-fluid">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Breeders"
                list={products.breeders}
                handleFilters={filters =>
                  this.handleFilters(filters, 'breeder')
                }
              />
              <CollapseCheckbox
                initState={true}
                title="Breeds"
                list={products.breeds}
                handleFilters={filters => this.handleFilters(filters, 'breed')}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div style={{ clear: 'both' }}>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.product };
};
const mapDispatchToProps = dispatch => {
  return {
    getBreeders: () => dispatch(getBreeders()),
    getBreeds: () => dispatch(getBreeds()),
    getProductsToShop: (skip, limit, filters = [], previousState = []) =>
      dispatch(getProductsToShop(skip, limit, filters, previousState))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
