import React from 'react'

const LayoutWrapper = ({ children }) => {
  return (
    <div className='relative flex items-center justify-center h-screen w-full'>
      {children}
    </div>
  )
}

export default LayoutWrapper