import { apiGetCommentsForPost, apiAddComment,
  apiDeleteComment, apiEditComment, apiUpVoteComment, apiDownVoteComment
} from '../api/comment'

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT';
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT';
export const HANDLE_COMMENT_CONTENTS_CHANGE = 'HANDLE_COMMENT_CONTENTS_CHANGE';

export const loadComments = (id) => dispatch => (
  apiGetCommentsForPost(id)
    .then(comments => dispatch({
      type: LOAD_COMMENTS,
      id,
      comments
    }))
);

export const createNewComment = (comment) => dispatch => (
  apiAddComment(comment)
    .then(newComment => dispatch({
      type: ADD_COMMENT,
      comment: newComment
    }))
);

export const deleteExistingComment = (id, postId) => dispatch => (
  apiDeleteComment(id)
    .then(() => dispatch({
      type: REMOVE_COMMENT,
      id,
      postId
    }))
);

export const editExistingComment = (id, body) => dispatch => (
  apiEditComment(id, body)
    .then(comment => dispatch({
      type: EDIT_COMMENT,
      comment
    }))
);

export const voteUpComment = (comment) => dispatch => (
  apiUpVoteComment(comment.id)
    .then(comment => dispatch({
      type: VOTE_UP_COMMENT,
      comment
    }))
);

export const voteDownComment = (comment) => dispatch => (
  apiDownVoteComment(comment.id)
    .then(comment => dispatch({
      type: VOTE_DOWN_COMMENT,
      comment
    }))
);

export const handleCommentContentsChange = (comments) => ({
  type: HANDLE_COMMENT_CONTENTS_CHANGE,
  comments
});