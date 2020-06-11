import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA,
  GET_ERRORS,
} from '../constants/types';

import { USER_SERVER, PRODUCT_SERVER } from '../components/utils/misc';

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const authSuccess = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const logoutSuccess = (user) => ({
  type: LOGOUT_USER,
  payload: user,
});

export const addToCartSuccess = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const getCartItemsSuccess = (items) => ({
  type: GET_CART_ITEMS,
  payload: items,
});

export const removeCartItemSuccess = (item) => ({
  type: REMOVE_CART_ITEM,
  payload: item,
});

export const onSuccessBuySuccess = (buyRequest) => ({
  type: ON_SUCCESS_BUY,
  payload: buyRequest,
});

export const updateUserDataSuccess = (userData) => ({
  type: UPDATE_USER_DATA,
  payload: userData,
});

export const registerUser = (dataToSubmit) => (dispatch) =>
  axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((res) => dispatch(registerUserSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const loginUser = (dataToSubmit) => (dispatch) =>
  axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((res) => dispatch(loginUserSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const auth = () => (dispatch) =>
  axios
    .get(`${USER_SERVER}/auth`)
    .then((res) => dispatch(authSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const logoutUser = () => (dispatch) =>
  axios
    .get(`${USER_SERVER}/logout`)
    .then((res) => dispatch(logoutSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const addToCart = (_id) => (dispatch) =>
  axios
    .post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then((res) => dispatch(addToCartSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const getCartItems = (cartItems, userCart) => (dispatch) => {
  return axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then((res) => {
      userCart.forEach((item) => {
        res.data.forEach((k, i) => {
          if (item.id === k._id) {
            res.data[i].quantity = item.quantity;
          }
        });
      });
      return dispatch(getCartItemsSuccess(res.data));
    })
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const removeCartItem = (id) => (dispatch) => {
  return axios
    .get(`${USER_SERVER}/removeFromCart?_id=${id}`)
    .then((res) => {
      res.data.cart.forEach((item) => {
        res.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            res.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return dispatch(removeCartItemSuccess(res.data));
    })
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const onSuccessBuy = (data) => (dispatch) =>
  axios
    .post(`${USER_SERVER}/successBuy`, data)
    .then((res) => dispatch(onSuccessBuySuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const updateUserData = (dataToSubmit) => (dispatch) =>
  axios
    .post(`${USER_SERVER}/update_profile`, dataToSubmit)
    .then((res) => dispatch(updateUserDataSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export function clearUpdateUser() {
  return {
    type: CLEAR_UPDATE_USER_DATA,
    payload: '',
  };
}
