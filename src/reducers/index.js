import { combineReducers } from 'redux';

import categories from './categories';
import comment from './comment';
import post from './post';

export default combineReducers({
  categories,
  post,
  comment,
});