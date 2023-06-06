'use client'
import React from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { hideReport } from '@/store/feature/AppSlice'
import CardWrapper from './Wrapper'
import CloseButton from '../button/CloseButton'
import { formatDate } from '@/utils/client/date'

const DisplayReport = () => {
  const dispatch = useDispatch()
  const { report, showReport } = useSelector(state => state.app)

  if (!showReport) return null
  const parsedDate = formatDate(report.date)
  return (
    <CardWrapper padding={0}>
      <div className='relative w-64 p-3'>
        <CloseButton
          className='absolute top-1 right-1'
          onClick={() => dispatch(hideReport())}
        />
        <p className='text-sm font-coolvetica font-semibold text-mine-shaft-600'>
          ID: {report._id}
        </p>
        <Image src={report.image} width={256} height={256} alt='Reporte' className='h-64 w-64 object-contain rounded-md my-2 bg-[#f5f5f5]' />
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
  )
}

export default DisplayReport