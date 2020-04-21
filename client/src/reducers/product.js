import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BREEDERS,
  GET_BREEDER,
  GET_BREEDS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BREED,
  ADD_BREEDER,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
} from '../constants/types';

///rename to products for better fit

const product = (state = { breeders: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload,
      };
    case GET_BREEDERS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_BREEDER:
      return {
        ...state,
        breeder: action.payload,
      };
    case GET_BREEDS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };
    case ADD_BREED:
      return {
        ...state,
        addBreed: action.payload.success,
        breeds: action.payload.breeds,
      };
    case ADD_BREEDER:
      return {
        ...state,
        addBreeder: action.payload.success,
        breeders: action.payload.breeders,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload,
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload,
      };
    default:
      return state;
  }
};

export default product;
