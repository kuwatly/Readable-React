import uuid from 'uuid';
import {API, headers, UP_VOTE_OPTION, DOWN_VOTE_OPTION} from './readableAPI'

export const apiGetPostsForCategory = (categoryId) =>
  fetch(`${API}/${categoryId}/posts`, {headers})
    .then(res => res.json());

export const apiGetPosts = () =>
  fetch(`${API}/posts`, {headers})
    .then(res => res.json())
    .then(posts => posts.filter(post => !post.deleted));

export const apiAddPost = (post) =>
  fetch(`${API}/posts/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      ...post,
      id: uuid(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const apiGetPostDetails = (id) =>
  fetch(`${API}/posts/${id}`, {headers})
    .then(res => res.json());

export const apiEditPost = ({id, title, body}) =>
  fetch(`${API}/posts/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      title,
      body,
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const apiDeletePost = (id) =>
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

export const apiUpVotePost = votePost(UP_VOTE_OPTION);
export const apiDownVotePost = votePost(DOWN_VOTE_OPTION);
