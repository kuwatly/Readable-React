import { API, headers } from './readableAPI'

export const getCategories = () =>
  fetch(`${API}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);