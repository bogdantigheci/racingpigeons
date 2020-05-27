import { combineReducers } from 'redux';
import user from './user';
import product from './product';
import site from './site';
import post from './post';
import exchangeRate from './exchangeRate';

const reducer = combineReducers({
  user,
  product,
  site,
  post,
  exchangeRate,
});

export default reducer;
