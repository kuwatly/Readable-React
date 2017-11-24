export const STATE_POSTS = 'posts';
export const LOAD_POSTS = 'LOAD_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const VOTE_UP_POST = 'VOTE_UP_POST';
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST';

export function loadPosts({ posts }) {
  return {
    type: LOAD_POSTS,
    posts,
  }
}

export function addPost ({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
  }
}

export function editPost ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body,
  }
}

export function removePost ({ id, deleted }) {
  return {
    type: REMOVE_POST,
    id,
    deleted,
  }
}

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