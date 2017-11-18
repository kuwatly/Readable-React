import React from 'react'

export default function CategoryList ({ category, onSelect }) {
  return (
    <ul className='category-list'>
      {category.map((item) => (
        <li onClick={() => onSelect(item)} key={item.name}>
          <h3>{item.name}</h3>
        </li>
      ))}
    </ul>
  )
}