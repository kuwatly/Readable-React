import { combineReducers } from 'redux';

import categories from './categories';
import comment from './comment';
import posts from './posts';
import dialogs from './dialogs';
import tables from './tables';

export default combineReducers({
  categories,
  posts,
  dialogs,
  tables,
  comment,
});