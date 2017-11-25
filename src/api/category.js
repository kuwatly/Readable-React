import { API, headers } from './readableAPI'

export const apiGetCategories = () =>
  fetch(`${API}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);