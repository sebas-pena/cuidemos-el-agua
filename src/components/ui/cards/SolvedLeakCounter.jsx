'use client'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import CardWrapper from './Wrapper'

const SolvedLeakCounter = () => {
  const { solvedLeaksCounter } = useSelector(state => state.leaks)

  return (
    <CardWrapper
      hideShadownMobile
      noRoundedMobile
      padding='p-2 py-4 md:px'
      className="flex-1"
    >
      <div className='flex gap-2 md:gap-5'>
        <Image src='/svg/solved-report.svg' alt='icono de perdida de agua' width={45} height={45} />
        <div className='flex flex-col'>
          <h2 className='text-sm md:text-lg font-coolvetica font-semibold text-mine-shaft-600'>
            Reportes Cerrados
          </h2>
          {
            solvedLeaksCounter === null
              ? <Image src='/svg/spinner-black.svg' alt='loading' className='mx-auto py-[4px]' width={24} height={24} />
              : <span className='text-2xl font-coolvetica font-semibold text-mine-shaft-600 text-center'>{solvedLeaksCounter}</span>
          }
        </div>
      </div>
    </CardWrapper>
  )
}

export default SolvedLeakCounter