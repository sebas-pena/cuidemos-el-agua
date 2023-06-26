'use client'
import React from 'react'
import Image from 'next/image'
import CardWrapper from './Wrapper'
import { useSelector } from 'react-redux'

const LeaksCounter = () => {
  const { totalLeaksCounter } = useSelector(state => state.leaks)
  return (
    <CardWrapper
      hideShadownMobile
      noRoundedMobile
      padding='p-2 py-4 md:px'
      className="flex-1"
    >
      <div className='flex gap-5'>
        <Image src='/svg/leak.svg' alt='icono de perdida de agua' width={45} height={45} />
        <div className='flex flex-col'>
          <h2 className='text-sm md:text-lg font-coolvetica font-semibold text-mine-shaft-600'>
            Perdidas Reportadas
          </h2>
          {
            totalLeaksCounter === null
              ? <Image src='/svg/spinner-black.svg' alt='loading' className='mx-auto py-[7px]' width={24} height={24} />
              : <span className='text-2xl font-coolvetica font-semibold text-mine-shaft-600 text-center'>{totalLeaksCounter}</span>
          }
        </div>
      </div>
    </CardWrapper>
  )
}

export default LeaksCounter