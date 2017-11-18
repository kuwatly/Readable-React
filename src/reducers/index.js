import { combineReducers } from 'redux';

import category from './category';
import comment from './comment';
import post from './post';

export default combineReducers({
  category,
  post,
  comment,
});