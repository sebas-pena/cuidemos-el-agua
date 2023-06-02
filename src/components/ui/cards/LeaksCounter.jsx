import React from 'react'
import Image from 'next/image'
import CardWrapper from './Wrapper'

const LeaksCounter = ({ count }) => {
  return (
    <CardWrapper>
      <div className='flex gap-5'>
        <Image src='/svg/leak.svg' alt='icono de perdida de agua' width={45} height={45} />
        <div className='flex flex-col'>
          <h2 className='text-lg font-coolvetica font-semibold text-mine-shaft-600'>
            Perdidas Reportadas Hoy
          </h2>
          <span className='text-2xl font-coolvetica font-semibold text-mine-shaft-600 text-center'>
            {count}
          </span>
        </div>
      </div>
    </CardWrapper>
  )
}

export default LeaksCounter