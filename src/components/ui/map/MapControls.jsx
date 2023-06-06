'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import ConfirmLocationButton from '../button/ConfirmLocationButton'
import LeaksCounter from '../cards/LeaksCounter'
import ReportButton from '../button/ReportButton'
import DescriptionInput from '../input/DescriptionInput'
import FileInput from '../input/FileInput'

const MapControls = () => {
  const { showCrosshairText, showDescriptionInput, showFileInput } = useSelector(state => state.map)
  const { totalReports } = useSelector(state => state.app)
  return (
    <div className='absolute top-3 right-3 z-[9999999] w-80'>
      <LeaksCounter count={totalReports} />
      <ReportButton />
      {
        showCrosshairText && <ConfirmLocationButton />
      }
      {
        showDescriptionInput &&
        <DescriptionInput />
      }
      {
        showFileInput &&
        <FileInput />
      }
    </div>
  )
}

export default MapControls