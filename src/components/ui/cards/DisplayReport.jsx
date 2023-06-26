'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { hideReport } from '@/store/feature/AppSlice'
import CardWrapper from './Wrapper'
import CloseButton from '../button/CloseButton'
import { formatDate } from '@/utils/client/date'

const DisplayReport = () => {
  const dispatch = useDispatch()
  const { report, showReport } = useSelector(state => state.app)
  const [animateDown, setAnimateDown] = useState(false)


  const handleClose = () => {
    const width = window.innerWidth
    if (width < 768) {
      setAnimateDown(true)
      setTimeout(() => {
        dispatch(hideReport())
      }, 300)
    }
    else {
      dispatch(hideReport())
    }
  }

  useEffect(() => {


    const handleClickOutside = (e) => {
      if (e.target.classList.contains('leaflet-marker-icon')) return;

      if (e.target.closest('.report-container') === null) {
        const width = window.innerWidth
        if (width < 768 && showReport) {
          handleClose()
        }
      }
    }

    window.addEventListener('click', handleClickOutside)

    if (!showReport) {
      setAnimateDown(false)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [showReport])

  if (!report) {
    return null
  }

  const parsedDate = formatDate(report.date)

  return (
    <div
      className={`report-container bottom-0 absolute w-full md:w-64 md:top-3 md:left-3 z-[1000] duration-300 ${animateDown ? 'animate-slide-down md:animate-none' : 'animate-slide-up md:animate-none'} `}
    >
      <CardWrapper padding={0}>
        <div className='relative w-full p-3'>
          <CloseButton
            className='absolute top-1 right-1'
            onClick={handleClose}
          />
          <p className='text-sm font-coolvetica font-semibold text-mine-shaft-600'>
            ID: {report._id}
          </p>
          <Image src={report.image} key={report.image} width={256} height={256} alt='Reporte' className='h-64 w-full object-contain rounded-md my-2 bg-[#f5f5f5]' />
          <h3 className='text-md font-coolvetica font-semibold text-mine-shaft-600'>
            {parsedDate}
          </h3>
          <h3 className='text-lg font-coolvetica font-semibold text-mine-shaft-600'>
            Descripcion:
          </h3>
          <p className='text-md font-semibold text-mine-shaft-600'>
            {report.description}
          </p>
        </div>
      </CardWrapper>
    </div>
  )
}

export default DisplayReport