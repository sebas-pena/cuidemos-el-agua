import React from 'react'

const AuthInput = ({ title, ...props }) => {
  return (
    <label className='w-full'>
      <p className='font-coolvetica text-lg mb-2 cursor-pointer'>{title}</p>
      <input
        className='w-full rounded-md py-1 h-9 px-4 text-neutral-800 bg-[#f3f3f3] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 duration-300'
        {...props}
      />
    </label>
  )
}

export default AuthInput