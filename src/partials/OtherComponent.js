import React from 'react'

function OtherComponent(props) {
  const { posts } = props

  return (
    <>
      <ul>
        {posts.map(item => (
          <li key={`${item.id}`}>{item.title}</li>
        ))}
      </ul>
    </>
  )
}

export default OtherComponent
