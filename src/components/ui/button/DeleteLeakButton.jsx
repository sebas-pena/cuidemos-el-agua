'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteLeak } from '@/store/feature/LeaksSlice'
import Image from 'next/image'

const DeleteLeakButton = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    setIsLoading(true)
    fetch(`/api/v1/leak/${id}`, {
      method: 'DELETE',
    })
      .then(async res => {
        return {
          ok: res.ok,
          res: await res.json()
        }
      })
      .then(({ ok, res }) => {
        if (ok) {
          dispatch(deleteLeak(id))
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
      className={`bg-red-600 hover:bg-red-700 active:bg-red-800 p-1 rounded-md`}
      onClick={handleClick}
    >
      <Image src='/svg/trash.svg' width={18} height={18} alt='Eliminar' />
    </button>
  )
}

export default DeleteLeakButton