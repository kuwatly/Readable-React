import {API, headers, UP_VOTE_OPTION, DOWN_VOTE_OPTION} from './readableAPI'
import { v4 } from 'uuid';

export const getPostsForCategory = (categoryId) =>
  fetch(`${API}/${categoryId}/posts`, {headers})
    .then(res => res.json());

export const getPosts = () =>
  fetch(`${API}/posts`, {headers})
    .then(res => res.json());

export const addPost = (post) =>
  fetch(`${API}/posts/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      ...post,
      id: v4(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const getPostDetails = (id) =>
  fetch(`${API}/posts/${id}`, {headers})
    .then(res => res.json());

export const editPost = (id, post) =>
  fetch(`${API}/posts/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      ...post
    })
  }).then(res => res.json());

export const deletePost = (id) =>
  fetch(`${API}/posts/${id}`, {
    method: 'DELETE',
    headers: headers,
  });

const votePost = (option) => (id) =>
  fetch(`${API}/posts/${id}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option})
    })
    .then(res => res.json());

export const upVotePost = votePost(UP_VOTE_OPTION);
export const downVotePost = votePost(DOWN_VOTE_OPTION);
