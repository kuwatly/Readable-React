import { LOAD_CATEGORIES } from '../actions/category';

const category = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CATEGORIES:
      return action.categories;

    default:
      return state;
  }
}

export default category;