'use client'
import { hideCrosshairText, lock } from '@/store/feature/MapSlice'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ConfirmLocationButton = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(lock())
    dispatch(hideCrosshairText())
  }
  return (
    <button
      className='flex gap-2 w-full justify-center items-center rounded-lg  py-2 px-4 shadow-md bg-green-600 hover:bg-green-700 active:bg-green-800'
      onClick={handleClick}
    >
      <Image src='/svg/tick.svg' width={20} height={20} alt='Reportar' />
      <span className='font-coolvetica font-semibold text-xl text-white'>
        Confirmar Ubicación
      </span>
    </button>
  )
}

export default ConfirmLocationButton