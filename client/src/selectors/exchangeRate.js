import _ from 'lodash';

export const getRateRON = (state) => _.get(state, 'exchangeRate.rates.RON', 0);
