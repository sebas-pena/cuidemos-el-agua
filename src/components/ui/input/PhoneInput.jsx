'use client'
import Image from 'next/image'
import React from 'react'

const PhoneInput = ({ title, error, ...props }) => {

  const handleChange = (e) => {
    if (e.target.value.length > 9) {
      e.target.value = e.target.value.slice(0, 9)
    }
  }

  return (
    <div className='relative w-full pb-5'>
      <label className='w-full'>
        <p className='font-coolvetica text-lg mb-2 cursor-pointer'>{title}</p>
        <div
          className={`flex gap-2 items-center w-full rounded-md bg-[#f3f3f3] focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-opacity-50 duration-300 ${error ? 'ring-2 ring-red-400' : ''}`}
        >
          <div className='flex px-4 items-center gap-2'>
            <Image src='/svg/uruguay-flag.svg' alt='bandera de uruguay' width={24} height={24} />
            <span className='leading-none text-neutral-800'>
              +598
            </span>
          </div>
          <input
            className='w-full py-1 h-9 text-neutral-800 rounded-r-md focus:outline-none bg-[#f3f3f3] border-l-2 border-l-neutral-400 indent-2'
            {...props}
            onChange={handleChange}
            type='number'
          />
        </div>
      </label>
      {error && (
        <p className='absolute bottom-0 left-0 text-sm text-red-600'>{error}</p>
      )}
    </div>
  )
}

export default PhoneInput