import {
  OPEN_POST_DIALOG,
  CLOSE_POST_DIALOG,
  HANDLE_POST_DIALOG_CHANGE,
  OPEN_EDIT_POST_DIALOG,
} from '../actions/dailog';

import {
  ADD_POST,
  EDIT_POST,
} from '../actions/post';

function dialogs(state = initialState, action) {
  switch (action.type) {
    case OPEN_POST_DIALOG:
      return {
        ...state,
        openPostDialog: true
      };

    case CLOSE_POST_DIALOG:
      return {
        ...state,
        isEdit: false,
        openPostDialog: false,
        title: undefined,
        body: undefined,
        owner: undefined,
        category: undefined
      };

    case HANDLE_POST_DIALOG_CHANGE:
      return {
        ...state,
        [action.source]: action.value
      };

    case OPEN_EDIT_POST_DIALOG:
      const {title, body, author, category, id} = action.post;
      return {
        ...state,
        isEdit: true,
        openPostDialog: true,
        title,
        body,
        owner: author,
        category,
        id
      };

    case ADD_POST:
    case EDIT_POST:
      return {
        ...state,
        openPostDialog: false,
        isEdit: false,
        title: undefined,
        body: undefined,
        owner: undefined,
        category: undefined
      };

    default:
      return state;
  }
}

const initialState = {
  isEdit: false,
  openPostDialog: false
};

export default dialogs;