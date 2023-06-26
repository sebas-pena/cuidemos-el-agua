'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import CardWrapper from '../cards/Wrapper'
import CloseButton from '../button/CloseButton'

const ErrorConfirmEmail = ({ handleCloseModal, resendEmail, credentials }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSented, setEmailSented] = useState(false)

  const handleResendEmail = () => {
    setIsLoading(true)
    fetch('/api/v1/auth/resend-confirmation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(async res => {
        const data = await res.json()
        if (res.ok) {
          return data
        } else {
          const error = new Error(data.message || 'Something went wrong!')
          throw error
        }
      })
      .then(data => {
        setEmailSented(true)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='w-full h-full flex items-center justify-center bg-black/30'>
      <div className='max-w-2xl text-center px-4'>
        <CardWrapper padding='px-5 py-7' width="w-full">
          <div className='relative'>
            <div className='absolute right-0 translate-x-3 -translate-y-3 top-0'>
              <CloseButton onClick={handleCloseModal} />
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <h3 className='text-2xl max-w-sm font-coolvetica text-neutral-800'>¡Ups! Verifica tu correo electrónico</h3>
              <p className='text-neutral-700'>
                Antes de continuar, debes verificar tu correo electrónico. Revisa tu casilla de correo y haz click en el enlace que te enviamos.
              </p>
            </div>
            {
              !resendEmail && (
                <button
                  type='submit'
                  className={`text-md rounded-md flex justify-center items-center px-4 py-1 mt-4 mx-auto text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300 ${emailSented ? "" : "disabled:bg-blue-400"}`}
                  disabled={isLoading || emailSented}
                  onClick={handleResendEmail}
                >
                  {
                    isLoading ? <Image src='/svg/spinner.svg' alt='loading' width={24} height={24} />
                      : emailSented ? "Correo Enviado" : 'Reenviar correo electrónico de confirmación'
                  }
                </button>
              )
            }
          </div>
        </CardWrapper>
      </div>
    </div>
  )
}

export default ErrorConfirmEmail