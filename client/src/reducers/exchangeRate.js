import { GET_EXCHANGE_RATES } from '../constants/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_EXCHANGE_RATES:
      return {
        ...state,
        ...action.rates,
      };
    default:
      return state;
  }
}
