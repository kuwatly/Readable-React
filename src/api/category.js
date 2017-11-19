import { API, HEADERS } from 'readableAPI'

export const getCategories = () => {
  fetch(`${API}/categories/`, { HEADERS })
    .then(res => res.json())
    .then(data => data.categories)
};