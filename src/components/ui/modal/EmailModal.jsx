'use client'
import React from 'react'
import CardWrapper from '../cards/Wrapper'
import ButtonLink from '../link/ButtonLink'
import CloseButton from '../button/CloseButton'

const EmailModal = ({ handleCloseModal, emailProvider }) => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-black/30 px-4'>
      <CardWrapper padding='px-8 py-7'>
        <div className='relative'>
          <div className='absolute right-0 translate-x-5 -translate-y-4 top-0'>
            <CloseButton onClick={handleCloseModal} />
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-2xl max-w-sm font-coolvetica text-neutral-800'>Verifica tu correo electrónico</h1>
            <p className='text-center text-neutral-700 mb-3'>Te hemos enviado un correo electrónico con un enlace para verificar tu cuenta.</p>
            <ButtonLink href={`https://${emailProvider}`} paddingX='px-0' paddingY='py-0' className='text-md rounded-md h-8 flex justify-center items-center px-4 mt-5 text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300'>
              Ir a mi casilla de correo
            </ButtonLink>
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}

export default EmailModal