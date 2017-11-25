import {
  apiAddPost,
  apiEditPost,
  apiDeletePost, apiGetPosts
} from "../api/post";

export const LOAD_POSTS = 'LOAD_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const VOTE_UP_POST = 'VOTE_UP_POST';
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST';

export const loadPosts = () => dispatch => (
  apiGetPosts()
    .then(posts => dispatch({
      type: LOAD_POSTS,
      posts
    }))
);

export const addPost = (post) => dispatch => (
  apiAddPost(post)
    .then(newPost => dispatch({
      type: ADD_POST,
      newPost
    }))
);

export const editPost = ({id, title, body}) => dispatch => (
  apiEditPost({id, title, body})
    .then(post => dispatch({
      type: EDIT_POST,
      post
    }))
);

export const removePost = (id) => dispatch => (
  apiDeletePost(id)
    .then(() => dispatch({
      type: REMOVE_POST,
      id
    }))
);

export function voteUpPost ({ id, voteScore }) {
  return {
    type: VOTE_UP_POST,
    id,
    voteScore,
  }
}

export function voteDownPost ({ id, voteScore }) {
  return {
    type: VOTE_DOWN_POST,
    id,
    voteScore,
  }
}