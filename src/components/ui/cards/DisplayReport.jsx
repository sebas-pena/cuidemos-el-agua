'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import CardWrapper from './Wrapper'
import CloseButton from '../button/CloseButton'
import { formatDate } from '@/utils/client/date'
import ReportAbuseButton from '../button/ReportAbuseButton'
import ToggleCloseReportButton from '../button/ToggleCloseReportButton'
import { hideLeak } from '@/store/feature/LeaksSlice'
import DeleteLeakButton from '../button/DeleteLeakButton'

const DisplayReport = () => {
  const dispatch = useDispatch()
  const { leakOnDisplay, showLeak } = useSelector(state => state.leaks)
  const [animateDown, setAnimateDown] = useState(false)
  const { role, id } = useSelector(state => state.user)
  const handleClose = () => {
    const width = window.innerWidth
    if (width < 768) {
      setAnimateDown(true)
      setTimeout(() => {
        dispatch(hideReport())
      }, 300)
    }
    else {
      dispatch(hideLeak())
    }
  }

  useEffect(() => {

    const handleClickOutside = (e) => {
      if (e.target.classList.contains('leaflet-marker-icon')) return;

      if (e.target.closest('.report-container') === null) {
        const width = window.innerWidth
        if (width < 768 && showLeak) {
          handleClose()
        }
      }
    }

    window.addEventListener('click', handleClickOutside)

    if (!showLeak) {
      setAnimateDown(false)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [showLeak])

  if (!leakOnDisplay) {
    return null
  }

  const parsedDate = formatDate(leakOnDisplay.date)

  return (
    <div
      className={`report-container bottom-0 absolute w-full md:w-64 md:top-3 md:left-3 z-[1000] duration-300 ${animateDown ? 'animate-slide-down md:animate-none' : 'animate-slide-up md:animate-none'} `}
    >
      <CardWrapper padding={0}>
        <div className='relative w-full p-3'>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <ReportAbuseButton
                onClick={handleClose}
                id={leakOnDisplay._id}
                key={leakOnDisplay._id + 'abuse_btn'}
              />
              {
                (role === 'admin' || id === leakOnDisplay.reportedBy) &&
                <DeleteLeakButton id={leakOnDisplay._id} />
              }
            </div>
            <CloseButton
              onClick={handleClose}
            />
          </div>
          {
            leakOnDisplay.file.contentType.includes('video')
              ? <video src={leakOnDisplay.file.url} key={leakOnDisplay.file.url + 'video'} controls className='h-64 w-full object-contain rounded-md my-2 bg-[#f5f5f5]' />
              : <Image src={leakOnDisplay.file.url} key={leakOnDisplay.file.url + 'image'} width={256} height={256} alt='Reporte' className='h-64 w-full object-contain rounded-md my-2 bg-[#f5f5f5]' />
          }
          <h3 className='text-md font-coolvetica font-semibold text-mine-shaft-600'>
            {parsedDate}
          </h3>
          <h3 className='text-lg font-coolvetica font-semibold text-mine-shaft-600'>
            Descripcion:
          </h3>
          <p className='text-md font-semibold text-mine-shaft-600 break-words'>
            {leakOnDisplay.description}
          </p>
        </div>
        {
          (role === 'admin' || id === leakOnDisplay.reportedBy) &&
          <ToggleCloseReportButton
            id={leakOnDisplay._id}
            open={leakOnDisplay.closedAt === null}
            key={leakOnDisplay._id + 'solved_btn'}
          />
        }
      </CardWrapper>
    </div>
  )
}

export default DisplayReport