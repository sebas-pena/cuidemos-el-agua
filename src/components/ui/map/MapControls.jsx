'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import ConfirmLocationButton from '../button/ConfirmLocationButton'
import LeaksCounter from '../cards/LeaksCounter'
import ReportButton from '../button/ReportButton'

const MapControls = () => {
  const showingCrosshair = useSelector(state => state.map).showCrosshair
  return (
    <div className='absolute top-3 right-3 z-[9999999]'>
      <LeaksCounter count={10} />
      <ReportButton />
      {
        showingCrosshair && <ConfirmLocationButton />
      }
    </div>
  )
}

export default MapControls