export const STATE_CATEGORIES = 'categories';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export function loadCategories({ categories }) {
  return {
    type: LOAD_CATEGORIES,
    categories,
  }
}