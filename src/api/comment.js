import {API, HEADERS, UP_VOTE_OPTION, DOWN_VOTE_OPTION} from 'readableAPI'
import { v4 } from 'uuid';

export const getCommentsForPost = (postId) =>
  fetch(`${API}/comments/${postId}/comments`, {HEADERS})
    .then(res => res.json());

export const addComment = (comment) =>
  fetch(`${api}/comments/`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      ...comment,
      id: v4(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const getCommentDetails = (id) =>
  fetch(`${API}/comments/${id}`, {HEADERS})
    .then(res => res.json());

export const editComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({
      ...comment
    })
  }).then(res => res.json());

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  });

const voteComment = (option) => (id) =>
  fetch(`${api}/comments/${id}`,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({option})
    })
    .then(res => res.json());

export const upVoteComment = voteComment(UP_VOTE_OPTION);
export const downVoteComment = voteComment(DOWN_VOTE_OPTION);
