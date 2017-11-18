import {
  STATE_POSTS,
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
} from '../actions/post'

const post = (state = {}, action) => {
  const { id, timestamp, title, body, author, category, voteScore, deleted } = action;
  switch(action.type) {

    case LOAD_POSTS :
      return action.posts;

    case ADD_POST :
      const newPost = {};
      newPost.id = id;
      newPost.timestamp = timestamp;
      newPost.title = title;
      newPost.body = body;
      newPost.author = author;
      newPost.category = category;
      newPost.voteScore = voteScore;
      newPost.deleted = deleted;

      return {
        ...state,
        [STATE_POSTS]: {
          ...state[STATE_POSTS],
          [id]: newPost,
        }
      };

    case EDIT_POST :
      return {
        ...state,
        [STATE_POSTS]: {
          ...state[STATE_POSTS],
          [id]: {
            ...state[STATE_POSTS][id],
            ['title']: title,
            ['body']: body,
          }
        }
      };

    case REMOVE_POST :
      return {
        ...state,
        [STATE_POSTS]: {
          ...state[STATE_POSTS],
          [id]: {
            ...state[STATE_POSTS][id],
            ['deleted']: deleted,
          }
        }
      };

    case VOTE_UP_POST :
    case VOTE_DOWN_POST :
      return {
        ...state,
        [STATE_POSTS]: {
          ...state[STATE_POSTS],
          [id]: {
            ...state[STATE_POSTS][id],
            ['voteScore']: voteScore,
          }
        }
      };

    default:
      return state;
  }
}

export default post;