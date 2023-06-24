'use client'
import React from 'react'
import CardWrapper from '../cards/Wrapper'

const EmailModal = ({ handleCloseModal }) => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-black/30'>
      <CardWrapper padding='px-8 py-7'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <h1 className='text-2xl max-w-sm font-coolvetica text-neutral-800'>Verifica tu correo electrónico</h1>
          <p className='text-center text-neutral-700'>Te hemos enviado un correo electrónico con un enlace para verificar tu cuenta.</p>
          <button
            className='text-md rounded-md h-8 flex justify-center items-center px-4 mt-5 text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300'
            onClick={handleCloseModal}
          >
            Cerrar
          </button>
        </div>
      </CardWrapper>
    </div>
  )
}

export default EmailModal