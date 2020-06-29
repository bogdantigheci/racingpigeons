import axios from 'axios';

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
  GET_PAYMENTS,
  GET_PAYMENT,
} from '../constants/types';
import { PRODUCT_SERVER } from '../components/utils/misc';

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err,
});

export const getProductsByArrivalSuccess = (products) => ({
  type: GET_PRODUCTS_BY_ARRIVAL,
  payload: products,
});

export const getBreedersSuccess = (breeders) => ({
  type: GET_BREEDERS,
  payload: breeders,
});

export const getBreedsSuccess = (breeds) => ({
  type: GET_BREEDS,
  payload: breeds,
});

export const getProductsToShopSuccess = (products) => ({
  type: GET_PRODUCTS_TO_SHOP,
  payload: products,
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const sellRequestSuccess = (request) => ({
  type: SELL_REQUEST,
  payload: request,
});

export const getSellRequestsSuccess = (requests) => ({
  type: GET_SELL_REQUESTS,
  payload: requests,
});

export const getSellRequestSuccess = (request) => ({
  type: GET_SELL_REQUEST,
  payload: request,
});

export const approveSellRequestSuccess = (request) => ({
  type: GET_SELL_REQUEST,
  payload: request,
});

export const declineSellRequestSuccess = (request) => ({
  type: GET_SELL_REQUEST,
  payload: request,
});

export const getPaymentsSuccess = (payments) => ({
  type: GET_PAYMENTS,
  payload: payments,
});

export const getPaymentSuccess = (payment) => ({
  type: GET_PAYMENT,
  payload: payment,
});

export const reviewPaymentSuccess = (payment) => ({
  type: GET_PAYMENT,
  payload: payment,
});

export const addBreedSuccess = (breed) => ({
  type: ADD_BREED,
  payload: breed,
});
export const addBreederSuccess = (breeder) => ({
  type: ADD_BREEDER,
  payload: breeder,
});

export const getProductDetailSuccess = (product) => ({
  type: GET_PRODUCT_DETAIL,
  payload: product,
});

export const getBreederSuccess = (breeder) => ({
  type: GET_BREEDER,
  payload: breeder,
});

export const addCommentToProductSuccess = (comment) => ({
  type: GET_PRODUCT_DETAIL,
  payload: comment,
});

export const deleteCommentFromProductSuccess = (comment) => ({
  type: GET_PRODUCT_DETAIL,
  payload: comment,
});

export const editCommentFromProductSuccess = (comment) => ({
  type: GET_PRODUCT_DETAIL,
  payload: comment,
});

export const addRaceSuccess = (race) => ({
  type: ADD_RACE,
  payload: race,
});

export const getRacesSuccess = (races) => ({
  type: GET_RACES,
  payload: races,
});

export const getRaceSuccess = (race) => ({
  type: GET_RACE,
  payload: race,
});

export const getProductsByArrival = () => (dispatch) =>
  axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then((res) => dispatch(getProductsByArrivalSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const getBreeders = () => (dispatch) =>
  axios
    .get(`${PRODUCT_SERVER}/breeders`)
    .then((res) => dispatch(getBreedersSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const getBreeds = () => (dispatch) =>
  axios
    .get(`${PRODUCT_SERVER}/breeds`)
    .then((res) => dispatch(getBreedsSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const getProductsToShop = (
  skip,
  limit,
  filters = [],
  previousState = []
) => (dispatch) => {
  const data = {
    limit,
    skip,
    filters,
  };

  return axios
    .post(`${PRODUCT_SERVER}/shop`, data)
    .then((res) => {
      let newState = [...previousState, ...res.data.articles];
      const result = {
        size: res.data.size,
        articles: newState,
      };
      return dispatch(getProductsToShopSuccess(result));
    })
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const addProduct = (dataToSubmit) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then((res) => dispatch(addProductSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const sellRequest = (dataToSubmit) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/sell_request`, dataToSubmit)
    .then((res) => dispatch(sellRequestSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getSellRequests = () => (dispatch) =>
  axios
    .get(`${PRODUCT_SERVER}/requests`)
    .then((res) => dispatch(getSellRequestsSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const getSellRequest = (id) => (dispatch) =>
  axios
    .get(`${PRODUCT_SERVER}/requests/${id}`)
    .then((res) => dispatch(getSellRequestSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const approveSellRequest = (id) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/requests/${id}/approve`)
    .then((res) => dispatch(approveSellRequestSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};
export const declineSellRequest = (id) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/requests/${id}/decline`)
    .then((res) => dispatch(declineSellRequestSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getPayments = () => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/payments`)
    .then((res) => dispatch(getPaymentsSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getPayment = (id) => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/payments/${id}`)
    .then((res) => dispatch(getPaymentSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const reviewPayment = (id) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/payments/${id}`)
    .then((res) => dispatch(reviewPaymentSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: '',
  };
};

export const addBreed = (dataToSubmit, existingBreeds) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/breeds`, dataToSubmit)
    .then((res) => {
      let breeds = [...existingBreeds, res.data.breed];
      const result = {
        success: res.data.success,
        breeds,
      };
      return dispatch(addBreedSuccess(result));
    })
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const addBreeder = (dataToSubmit, existingBreeders) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/breeders`, dataToSubmit)
    .then((response) => {
      let breeders = [...existingBreeders, response.data.breeder];
      const result = {
        success: response.data.success,
        breeders,
      };
      return dispatch(addBreederSuccess(result));
    })
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getProductDetail = (id) => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then((res) => dispatch(getProductDetailSuccess(res.data[0])))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getBreeder = (id) => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/breeders/${id}`)
    .then((res) => dispatch(getBreederSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: '',
  };
}

export const addCommentToProduct = (prodId, commentData) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/comment/${prodId}`, commentData)
    .then((res) => dispatch(addCommentToProductSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err)));
};

export const deleteCommentFromProduct = (prodId, commentId) => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/comment/${prodId}/${commentId}`)
    .then((res) => dispatch(deleteCommentFromProductSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const editCommentFromProduct = (prodId, commentId, editCommentData) => (
  dispatch
) => {
  axios
    .post(
      `${PRODUCT_SERVER}/comment/${prodId}/${commentId}/edit`,
      editCommentData
    )
    .then((res) => dispatch(editCommentFromProductSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const addRace = (dataToSubmit, existingRaces) => (dispatch) => {
  return axios
    .post(`${PRODUCT_SERVER}/races`, dataToSubmit)
    .then((response) => {
      let races = [...existingRaces, response.data.race];
      const result = {
        success: response.data.success,
        races,
      };
      return dispatch(addRaceSuccess(result));
    })
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getRaces = () => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/races`)
    .then((res) => dispatch(getRacesSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getRace = (id) => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/races/${id}`)
    .then((res) => dispatch(getRaceSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
