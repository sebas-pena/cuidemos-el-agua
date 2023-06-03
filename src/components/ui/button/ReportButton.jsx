'use client'
import { hideCrosshair, showCrosshair } from '@/store/feature/MapSlice'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ReportButton = () => {
  const dispatch = useDispatch()
  const showingCrosshair = useSelector(state => state.map).showCrosshair

  const handleClick = () => {
    showingCrosshair ? dispatch(hideCrosshair()) : dispatch(showCrosshair())
  }

  const styles = showingCrosshair
    ? 'bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-800'
    : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
  return (
    <button
      className={`flex gap-2 w-full justify-center items-center rounded-lg  py-2 px-4 shadow-md ${styles}`}
      onClick={handleClick}
    >
      <Image src='/svg/report.svg' width={20} height={20} alt='Reportar' />
      <span className='font-coolvetica font-semibold text-xl text-white'>
        {
          showingCrosshair
            ? 'Cancelar Reporte'
            : 'Reportar Perdida'
        }
      </span>
    </button>
  )
}

export default ReportButton