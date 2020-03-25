import axios from 'axios';

import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BREEDERS,
  GET_BREEDS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BREED,
  ADD_BREEDER,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from '../constants/types';
import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}

export function getBreeders() {
  const request = axios
    .get(`${PRODUCT_SERVER}/breeders`)
    .then(response => response.data);
  return {
    type: GET_BREEDERS,
    payload: request
  };
}

export function getBreeds() {
  const request = axios
    .get(`${PRODUCT_SERVER}/breeds`)
    .then(response => response.data);
  return {
    type: GET_BREEDS,
    payload: request
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
    filters
  };

  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(response => {
    let newState = [...previousState, ...response.data.articles];

    return {
      size: response.data.size,
      articles: newState
    };
  });

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  };
}

export function addProduct(dataToSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(response => response.data);
  return {
    type: ADD_PRODUCT,
    payload: request
  };
}

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  };
};

export function addBreed(dataToSubmit, existingBreeds) {
  const request = axios
    .post(`${PRODUCT_SERVER}/breeds`, dataToSubmit)
    .then(response => {
      let breeds = [...existingBreeds, response.data.breed];
      return {
        success: response.data.success,
        breeds
      };
    });
  return {
    type: ADD_BREED,
    payload: request
  };
}

export function addBreeder(dataToSubmit, existingBreeders) {
  const request = axios
    .post(`${PRODUCT_SERVER}/breeders`, dataToSubmit)
    .then(response => {
      let breeders = [...existingBreeders, response.data.breeder];
      //console.log('breeeeders', existingBreeders, response.data);
      return {
        success: response.data.success,
        breeders
      };
    });
  console.log('requeeeest', request);
  return {
    type: ADD_BREEDER,
    payload: request
  };
}

export function getProductDetail(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response => {
      return response.data[0];
    });
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request
  };
}

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  };
}

export const addCommentToProduct = (prodId, commentData) => dispatch => {
  axios.post(`${PRODUCT_SERVER}/comment/${prodId}`, commentData).then(res =>
    dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: res.data
    })
  );
};

export const deleteCommentFromProduct = (prodId, commentId) => dispatch => {
  axios.get(`${PRODUCT_SERVER}/comment/${prodId}/${commentId}`).then(res =>
    dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: res.data
    })
  );
};
export const editCommentFromProduct = (
  prodId,
  commentId,
  editCommentData
) => dispatch => {
  axios
    .post(
      `${PRODUCT_SERVER}/comment/${prodId}/${commentId}/edit`,
      editCommentData
    )
    .then(res =>
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: res.data
      })
    );
};
