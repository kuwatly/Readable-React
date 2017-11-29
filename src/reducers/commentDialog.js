import {
  OPEN_COMMENT_DIALOG,
  CLOSE_COMMENT_DIALOG,
  HANDLE_COMMENT_DIALOG_CHANGE,
  OPEN_EDIT_COMMENT_DIALOG,
} from '../actions/dailog';
import {
  ADD_COMMENT, EDIT_COMMENT
} from "../actions/comment";

function commentDialog(state = initialCommentDialogState, action){
  switch (action.type) {
    case OPEN_COMMENT_DIALOG:
      return {
        ...state,
        isOpen: true
      };

    case OPEN_EDIT_COMMENT_DIALOG:
      const {body, author, id} = action.comment;
      return {
        ...state,
        isEdit: true,
        isOpen: true,
        body, author, id
      };

    case CLOSE_COMMENT_DIALOG:
    case ADD_COMMENT:
    case EDIT_COMMENT:
      return {
        ...state,
        isOpen: false,
        isEdit: false,
        id: undefined,
        body: undefined,
        author: undefined
      };

    case HANDLE_COMMENT_DIALOG_CHANGE:
      return {
        ...state,
        [action.source]: action.value
      };

    default:
      return state;
  }
}

const initialCommentDialogState = {
  isOpen: false,
  isEdit: false
};

export default commentDialog;