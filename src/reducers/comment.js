import {
  LOAD_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT,
} from '../actions/comment'

const comment = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        [action.id]: action.comments
      };

    case ADD_COMMENT:
      let existingComments = state[action.comment.parentId] || [];
      return {
        ...state,
        [action.comment.parentId]: existingComments.concat(action.comment)
      };

    case VOTE_UP_COMMENT:
    case VOTE_DOWN_COMMENT:
    case EDIT_COMMENT:
      existingComments = state[action.comment.parentId] || [];
      return {
        ...state,
        [action.comment.parentId]: existingComments.concat(action.comment)
      };

    case REMOVE_COMMENT:
      existingComments = state[action.comment.parentId] || [];
      return {
        ...state,
        [action.comment.parentId]: existingComments.concat(action.comment)
      };

    default:
      return state;
  }
};

export default comment;