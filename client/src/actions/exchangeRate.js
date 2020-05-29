import axios from 'axios';
import { GET_EXCHANGE_RATES } from '../constants/types';

export const getExchangeRates = (rates) => ({
  type: GET_EXCHANGE_RATES,
  rates,
});

export const getExchangeRate = () => (dispatch) =>
  axios
    .get(`https://api.exchangeratesapi.io/latest?symbols=RON`)
    .then((res) => {
      dispatch(getExchangeRates(res.data));
    })
    .catch((error) => {
      console.log(error);
    });
