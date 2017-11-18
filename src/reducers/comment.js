import {
  STATE_COMMENTS,
  LOAD_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT,
} from '../actions/comment'

const comment = (state = {}, action) => {
  const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = action;
  switch(action.type) {

    case LOAD_COMMENTS :
      return action.comments;

    case ADD_COMMENT :
      const newComment = {};
      newComment.id = id;
      newComment.parentId = parentId;
      newComment.timestamp = timestamp;
      newComment.body = body;
      newComment.author = author;
      newComment.voteScore = voteScore;
      newComment.deleted = deleted;
      newComment.parentDeleted = parentDeleted;

      return {
        ...state,
        [STATE_COMMENTS]: {
          ...state[STATE_COMMENTS],
          [id]: newComment,
        }
      };

    case EDIT_COMMENT :
      return {
        ...state,
        [STATE_COMMENTS]: {
          ...state[STATE_COMMENTS],
          [id]: {
            ...state[STATE_COMMENTS][id],
              ['body']: body,
            }
        }
      };

    case REMOVE_COMMENT :
      return {
        ...state,
        [STATE_COMMENTS]: {
          ...state[STATE_COMMENTS],
          [id]: {
            ...state[STATE_COMMENTS][id],
            ['deleted']: deleted,
            ['parentDeleted']: parentDeleted,
          }
        }
      };

    case VOTE_UP_COMMENT :
    case VOTE_DOWN_COMMENT :
      return {
        ...state,
        [STATE_COMMENTS]: {
          ...state[STATE_COMMENTS],
          [id]: {
            ...state[STATE_COMMENTS][id],
            ['voteScore']: voteScore,
          }
        }
      };

    default:
      return state;
  }
}

export default comment;