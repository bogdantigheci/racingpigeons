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
} from '../constants/types';
import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request,
  };
}

export function getBreeders() {
  const request = axios
    .get(`${PRODUCT_SERVER}/breeders`)
    .then((response) => response.data);
  return {
    type: GET_BREEDERS,
    payload: request,
  };
}

export function getBreeds() {
  const request = axios
    .get(`${PRODUCT_SERVER}/breeds`)
    .then((response) => response.data);
  return {
    type: GET_BREEDS,
    payload: request,
  };
}

export function getProductsToShop(
  skip,
  limit,
  filters = [],
  previousState = []
) {
  const data = {
    limit,
    skip,
    filters,
  };

  const request = axios
    .post(`${PRODUCT_SERVER}/shop`, data)
    .then((response) => {
      let newState = [...previousState, ...response.data.articles];

      return {
        size: response.data.size,
        articles: newState,
      };
    });

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request,
  };
}

export function addProduct(dataToSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}

export function sellRequest(dataToSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/sell_request`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: SELL_REQUEST,
    payload: request,
  };
}

export function getSellRequests() {
  const request = axios
    .get(`${PRODUCT_SERVER}/requests`)
    .then((response) => response.data);
  return {
    type: GET_SELL_REQUESTS,
    payload: request,
  };
}

export function getSellRequest(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/requests/${id}`)
    .then((response) => {
      return response.data;
    });
  return {
    type: GET_SELL_REQUEST,
    payload: request,
  };
}

export function reviewSellRequest(id) {
  const request = axios
    .post(`${PRODUCT_SERVER}/requests/${id}`)
    .then((response) => {
      return response.data;
    });
  return {
    type: GET_SELL_REQUEST,
    payload: request,
  };
}

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: '',
  };
};

export function addBreed(dataToSubmit, existingBreeds) {
  const request = axios
    .post(`${PRODUCT_SERVER}/breeds`, dataToSubmit)
    .then((response) => {
      let breeds = [...existingBreeds, response.data.breed];
      return {
        success: response.data.success,
        breeds,
      };
    });
  return {
    type: ADD_BREED,
    payload: request,
  };
}

export function addBreeder(dataToSubmit, existingBreeders) {
  const request = axios
    .post(`${PRODUCT_SERVER}/breeders`, dataToSubmit)
    .then((response) => {
      let breeders = [...existingBreeders, response.data.breeder];
      return {
        success: response.data.success,
        breeders,
      };
    });
  return {
    type: ADD_BREEDER,
    payload: request,
  };
}

export function getProductDetail(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then((response) => {
      return response.data[0];
    });
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request,
  };
}

export function getBreeder(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/breeders/${id}`)
    .then((response) => {
      return response.data;
    });
  return {
    type: GET_BREEDER,
    payload: request,
  };
}

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: '',
  };
}

export const addCommentToProduct = (prodId, commentData) => (dispatch) => {
  axios
    .post(`${PRODUCT_SERVER}/comment/${prodId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteCommentFromProduct = (prodId, commentId) => (dispatch) => {
  axios
    .get(`${PRODUCT_SERVER}/comment/${prodId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const editCommentFromProduct = (prodId, commentId, editCommentData) => (
  dispatch
) => {
  axios
    .post(
      `${PRODUCT_SERVER}/comment/${prodId}/${commentId}/edit`,
      editCommentData
    )
    .then((res) =>
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: res.data,
      })
    );
};

export function addRace(dataToSubmit, existingRaces) {
  const request = axios
    .post(`${PRODUCT_SERVER}/races`, dataToSubmit)
    .then((response) => {
      let races = [...existingRaces, response.data.race];
      return {
        success: response.data.success,
        races,
      };
    });
  return {
    type: ADD_RACE,
    payload: request,
  };
}

export function getRaces() {
  const request = axios
    .get(`${PRODUCT_SERVER}/races`)
    .then((response) => response.data);
  return {
    type: GET_RACES,
    payload: request,
  };
}

export function getRace(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/races/${id}`)
    .then((response) => {
      return response.data;
    });
  return {
    type: GET_RACE,
    payload: request,
  };
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
