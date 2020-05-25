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
  CLEAR_ERRORS,
  GET_ERRORS,
  ADD_RACE,
  GET_RACE,
  GET_RACES,
  SELL_REQUEST,
  GET_SELL_REQUESTS,
  GET_SELL_REQUEST,
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
    case SELL_REQUEST:
      return {
        ...state,
        sellRequest: action.payload,
      };
    case GET_SELL_REQUESTS:
      return {
        ...state,
        sellRequests: action.payload,
      };
    case GET_SELL_REQUEST:
      return {
        ...state,
        request: action.payload,
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
    case GET_ERRORS:
      return { ...state, errors: [action.payload] };
    case CLEAR_ERRORS:
      return {};
    case ADD_RACE:
      return {
        ...state,
        addRace: action.payload.success,
        races: action.payload.races,
      };
    case GET_RACES:
      return {
        ...state,
        ...action.payload,
      };
    case GET_RACE:
      return {
        ...state,
        race: action.payload,
      };
    default:
      return state;
  }
};

export default product;
