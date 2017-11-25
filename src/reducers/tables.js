import {
  HANDLE_POST_TABLE_CHANGE,
} from '../actions/post'


function tables(state = initialTablesState, action) {
  switch(action.type) {
    case HANDLE_POST_TABLE_CHANGE:
      return {
        ...state,
        [action.source]: action.value
      };

    default:
      return state;
  }
}

const initialTablesState = {
  order: 'desc',
  orderBy: 'voteScore',
  selected: [],
  page: 0,
  rowsPerPage: 5,
};

export default tables;