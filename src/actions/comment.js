export const STATE_COMMENTS = 'comments';
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT'
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT'

export function loadComments({ comments }) {
  return {
    type: LOAD_COMMENTS,
    comments,
  }
}

export function addComment ({ id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted}) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted,
  }
}

export function editComment ({ id, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    body,
  }
}

export function removeComment ({ id, deleted, parentDeleted }) {
  return {
    type: REMOVE_COMMENT,
    id,
    deleted,
    parentDeleted,
  }
}

export function voteUpComment ({ id, voteScore }) {
  return {
    type: VOTE_UP_COMMENT,
    id,
    voteScore,
  }
}

export function voteDownComment ({ id, voteScore }) {
  return {
    type: VOTE_DOWN_COMMENT,
    id,
    voteScore,
  }
}