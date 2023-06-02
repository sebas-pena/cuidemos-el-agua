import React from 'react'

const CardWrapper = ({ children, height, width, padding = 4 }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-${padding}`}
      style={
        {
          height: height || 'auto',
          width: width || 'auto',
        }
      }
    >
      {children}
    </div >
  )
}

export default CardWrapper