'use client'
import { closeLeak, reopenLeak } from '@/store/feature/LeaksSlice'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ToggleCloseReportButton = ({ id, open }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { loggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleClick = () => {
    setIsLoading(!isLoading)
    fetch(`/api/v1/leak/${id}/${open ? 'close' : 'reopen'}`, {
      method: 'PUT',
    })
      .then(async res => {
        return {
          ok: res.ok,
          res: await res.json()
        }
      })
      .then(({ ok, res }) => {
        if (ok) {
          if (open) {
            dispatch(closeLeak({ id, closedAt: res.data.closedAt }))
          } else {
            dispatch(reopenLeak(id))
          }
        } else {
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
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
              {
                open
                  ? 'Cerrar Reporte'
                  : 'Reabrir Reporte'
              }
            </span>
          </>
      }
    </button>
  )
}

export default ToggleCloseReportButton