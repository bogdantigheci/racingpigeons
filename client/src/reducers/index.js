import { combineReducers } from 'redux';
import user from './user';
import product from './product';
import site from './site';
import post from './post';

const reducer = combineReducers({
  user,
  product,
  site,
  post
});

export default reducer;
