import { combineReducers } from 'redux';

import categories from './categories';
import comment from './comment';
import posts from './posts';
import post from './post';
import postDialog from './postDialog';
import tables from './tables';
import commentDialog from './commentDialog';

export default combineReducers({
  categories,
  posts,
  post,
  postDialog,
  commentDialog,
  tables,
  comment,
});