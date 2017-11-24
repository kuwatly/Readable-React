import { getCategories } from "../api/category";

export const STATE_CATEGORIES = 'categories';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const fetchCategories = (category) => dispatch => (
  getCategories()
    .then(categories => dispatch({
      type: LOAD_CATEGORIES,
      categories,
      category
    }))
);