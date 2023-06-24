import React from 'react'

const AuthInput = ({ title, error, ...props }) => {
  return (
    <div className='relative w-full pb-5'>
      <label className='w-full'>
        <p className='font-coolvetica text-lg mb-2 cursor-pointer'>{title}</p>
        <input
          className={`w-full rounded-md py-1 h-9 px-4 text-neutral-800 bg-[#f3f3f3] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 duration-300 ${error ? 'ring-2 ring-red-400 ' : ''}'}`}
          {...props}
        />
      </label>
      {error && (
        <p className='absolute bottom-0 left-0 text-sm text-red-600'>{error}</p>
      )}
    </div>
  )
}

export default AuthInput