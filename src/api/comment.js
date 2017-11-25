import {API, headers, UP_VOTE_OPTION, DOWN_VOTE_OPTION} from './readableAPI'
import { v4 } from 'uuid';

export const apiGetCommentsForPost = (postId) =>
  fetch(`${API}/comments/${postId}/comments`, {headers})
    .then(res => res.json());

export const apiAddComment = (comment) =>
  fetch(`${API}/comments/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      ...comment,
      id: v4(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const apiGetCommentDetails = (id) =>
  fetch(`${API}/comments/${id}`, {headers})
    .then(res => res.json());

export const apiEditComment = (id, comment) =>
  fetch(`${API}/comments/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      ...comment
    })
  }).then(res => res.json());

export const apiDeleteComment = (id) =>
  fetch(`${API}/comments/${id}`, {
    method: 'DELETE',
    headers: headers,
  });

const voteComment = (option) => (id) =>
  fetch(`${API}/comments/${id}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option})
    })
    .then(res => res.json());

export const apiUpVoteComment = voteComment(UP_VOTE_OPTION);
export const apiDownVoteComment = voteComment(DOWN_VOTE_OPTION);
