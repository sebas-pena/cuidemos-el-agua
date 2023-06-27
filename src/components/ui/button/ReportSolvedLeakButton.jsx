'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ReportSolvedLeakButton = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { loggedIn } = useSelector(state => state.user)
  const handleClick = () => {
    setIsLoading(!isLoading)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || loggedIn === null}
      className="flex gap-2 w-full justify-center items-center rounded-lg  py-2 px-4 shadow-md bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-400/50 cursor-pointer disabled:cursor-default"
    >{
        (isLoading || loggedIn === null)
          ? <Image src='/svg/spinner.svg' width={20} height={20} alt='Reportar' />
          : <>
            <Image src='/svg/tick.svg' width={20} height={20} alt='Reportar' />
            <span className='font-coolvetica font-semibold text-xl text-white'>
              Marcar como resuelto
            </span>
          </>
      }
    </button>
  )
}

export default ReportSolvedLeakButton