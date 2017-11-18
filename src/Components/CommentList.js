import React from 'react'

export default function CommentList ({ post: comment }) {
  return (
    <ul className='comment-list'>
      {comment.map((item) => (
        <li key={item.id}>
          <h3>{item.body}</h3>
        </li>
      ))}
    </ul>
  )
}