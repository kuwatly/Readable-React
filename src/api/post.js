import {API, HEADERS, UP_VOTE_OPTION, DOWN_VOTE_OPTION} from 'readableAPI'
import { v4 } from 'uuid';

export const getPostsForCategory = (categoryId) =>
  fetch(`${API}/${categoryId}/posts`, {HEADERS})
    .then(res => res.json());

export const getPosts = () =>
  fetch(`${API}/posts`, {HEADERS})
    .then(res => res.json());

export const addPost = (post) =>
  fetch(`${api}/posts/`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      ...post,
      id: v4(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const getPostDetails = (id) =>
  fetch(`${API}/posts/${id}`, {HEADERS})
    .then(res => res.json());

export const editPost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({
      ...post
    })
  }).then(res => res.json());

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  });

const votePost = (option) => (id) =>
  fetch(`${api}/posts/${id}`,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({option})
    })
    .then(res => res.json());

export const upVotePost = votePost(UP_VOTE_OPTION);
export const downVotePost = votePost(DOWN_VOTE_OPTION);
