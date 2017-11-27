import { apiGetCategories } from "../api/category";

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const fetchCategories = (category) => dispatch => (
  apiGetCategories()
    .then(categories => dispatch({
      type: LOAD_CATEGORIES,
      categories,
      category
    }))
);