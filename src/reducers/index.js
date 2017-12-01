import { combineReducers } from 'redux';

import categories from './categories';
import posts from './posts';
import post from './post';
import postDialog from './postDialog';
import tables from './tables';
import commentDialog from './commentDialog';
import comments from './comments';

export default combineReducers({
  categories,
  posts,
  post,
  postDialog,
  commentDialog,
  tables,
  comments,
});