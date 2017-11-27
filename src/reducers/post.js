import {
  LOAD_POST_DETAILS,
  EDIT_POST,
  REMOVE_POST,
  VOTE_UP_POST,
  VOTE_DOWN_POST
} from '../actions/post';

function post(state = initialPostState, action) {
  switch (action.type) {
    case LOAD_POST_DETAILS:
    case EDIT_POST:
    case VOTE_UP_POST:
    case VOTE_DOWN_POST:
      return {
        post: action.post
      };

    case REMOVE_POST:
      return initialPostState;

    default:
      return state;
  }
}

const initialPostState = {
  post: null
};

export default post;