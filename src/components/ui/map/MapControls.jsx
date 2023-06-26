'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import ConfirmLocationButton from '../button/ConfirmLocationButton'
import LeaksCounter from '../cards/LeaksCounter'
import ReportButton from '../button/ReportButton'
import DescriptionInput from '../input/DescriptionInput'
import FileInput from '../input/FileInput'
import SolvedLeakCounter from '../cards/SolvedLeakCounter'

const MapControls = () => {
  const { showCrosshairText, showDescriptionInput, showFileInput } = useSelector(state => state.map)
  return (
    <div className='absolute top-0 left-0 md:top-3 md:left-auto md:right-3 z-[702] w-full md:w-80'>
      <div className='flex md:block'>
        <LeaksCounter />
        <SolvedLeakCounter />
      </div>
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