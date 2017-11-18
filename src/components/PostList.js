import React from 'react'

export default function PostList ({ post, onSelect }) {
  return (
    <ul className='post-list'>
      {post.map((item) => (
        <li onClick={() => onSelect(item)} key={item.id}>
          <h3>{item.title}</h3>
        </li>
      ))}
    </ul>
  )
}