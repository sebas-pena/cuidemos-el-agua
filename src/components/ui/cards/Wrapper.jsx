import React from 'react'

const CardWrapper = ({ children, height, width, padding = 'p-4', hideShadownMobile = false, noRoundedMobile = false, className = '' }) => {
  return (
    <div
      className={`bg-white ${className} ${noRoundedMobile ? "md:rounded-lg" : "rounded-lg"} ${hideShadownMobile ? "md:shadow-md" : "shadow-md"} ${padding}`}
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