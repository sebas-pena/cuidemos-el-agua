'use client'
import React, { useState } from 'react'
import MapControlButton from '../button/MapControlButton'
import { useDispatch } from 'react-redux'
import { confirmDescription } from '@/store/feature/MapSlice'

const DescriptionInput = ({ label, ...props }) => {
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(confirmDescription(description))
  }

  return (
    <>
      <label className='w-full block p-2 bg-white rounded-lg shadow-md'>
        <p className='text-lg text-center mb-2 font-semibold text-[#333]'>Describe la Situacion</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className='resize-none text-md  bg-[#f5f5f5] rounded-md p-2 w-full h-52 focus:outline-none' {...props}
        />
      </label>
      <MapControlButton
        style='green'
        onClick={handleClick}
      >
        <span className='font-coolvetica font-semibold text-xl text-white'>
          Siguiente
        </span>
      </MapControlButton>
    </>

  )
}

export default DescriptionInput