'use client'
import { confirmLocation } from '@/store/feature/MapSlice'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import MapControlButton from './MapControlButton'

const ConfirmLocationButton = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(confirmLocation())
  }
  return (
    <MapControlButton
      onClick={handleClick}
      styles='green'
    >
      <Image src='/svg/tick.svg' width={20} height={20} alt='Reportar' />
      <span className='font-coolvetica font-semibold text-xl text-white'>
        Confirmar Ubicación
      </span>
    </MapControlButton>
  )
}

export default ConfirmLocationButton