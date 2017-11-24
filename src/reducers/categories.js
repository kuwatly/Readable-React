import { LOAD_CATEGORIES } from '../actions/category';

function categories (state = initialCategoriesState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      let {categories, category} = action;
      return {
        categories,
        currentCategory: category
      };
    default:
      return state;
  }
}

const initialCategoriesState = {
  currentCategory: null,
  categories: []
};

export default categories;