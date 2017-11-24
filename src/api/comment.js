import {API, headers, UP_VOTE_OPTION, DOWN_VOTE_OPTION} from './readableAPI'
import { v4 } from 'uuid';

export const getCommentsForPost = (postId) =>
  fetch(`${API}/comments/${postId}/comments`, {headers})
    .then(res => res.json());

export const addComment = (comment) =>
  fetch(`${API}/comments/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      ...comment,
      id: v4(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const getCommentDetails = (id) =>
  fetch(`${API}/comments/${id}`, {headers})
    .then(res => res.json());

export const editComment = (id, comment) =>
  fetch(`${API}/comments/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      ...comment
    })
  }).then(res => res.json());

export const deleteComment = (id) =>
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

export const upVoteComment = voteComment(UP_VOTE_OPTION);
export const downVoteComment = voteComment(DOWN_VOTE_OPTION);
