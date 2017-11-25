import {
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
} from '../actions/post'


function posts(state = initialPostsState, action) {
  switch(action.type) {
    case LOAD_POSTS:
      return {
        posts: action.posts
      };

    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.newPost)
      };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.post.id).concat(action.post)
      };

    case REMOVE_POST :
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      };

    case VOTE_UP_POST :
    case VOTE_DOWN_POST :
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.post.id).concat(action.post)
      };

    default:
      return state;
  }
}

const initialPostsState = {
  posts: []
};

export default posts;