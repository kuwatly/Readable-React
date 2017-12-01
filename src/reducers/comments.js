import {
  LOAD_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT,
} from '../actions/comment'

const comments = (state = initialPostsState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        comments: action.comments
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.comment)
      };

    case VOTE_UP_COMMENT:
    case VOTE_DOWN_COMMENT:
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.comment.id).concat(action.comment)
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.id)
      };

    default:
      return state;
  }
};

const initialPostsState = {
  comments: [],
};

export default comments;