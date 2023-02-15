import React from 'react'

export default function Result({ word, definition}) {
  return (
    <div className='resultado'>
      <h2 className='resultado__h2'>{word}</h2>
      <p className='resultado__p'>{definition}</p>
      <div className='resultado__linea'></div>
    </div>
  )
}