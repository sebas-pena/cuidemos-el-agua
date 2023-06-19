import React from 'react'

const CardWrapper = ({ children, height, width, padding = 'p-4' }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md ${padding}`}
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