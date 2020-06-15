import _ from 'lodash';

export const selectRaces = (state) => _.get(state, 'product.races', []);
export const selectBreeders = (state) => _.get(state, 'product.breeders', []);
export const selectBreeds = (state) => _.get(state, 'product.breeds', []);
export const selectProductsByArrival = (state) =>
  _.get(state, 'product.byArrival', []);
