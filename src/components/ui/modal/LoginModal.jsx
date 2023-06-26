'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalWrapper from './ModalWrapper'
import CardWrapper from '../cards/Wrapper'
import ButtonLink from '../link/ButtonLink'
import { hideLoginModal } from '@/store/feature/AppSlice'

const LoginModal = () => {
  const { showLoginModal } = useSelector(state => state.app)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(hideLoginModal())
  }, [])
  const handleClose = () => {
    dispatch(hideLoginModal())
  }
  if (!showLoginModal) return null
  return (
    <ModalWrapper handleClose={handleClose} >
      <CardWrapper padding='px-8 py-7'>
        <div className='font-coolvetica text-center'>
          <p className='text-neutral-700 mb-5'>
            Para poder enviar un reporte, debes iniciar sesión.
          </p>
          <ButtonLink href='/auth/login'>
            Iniciar sesión
          </ButtonLink>
        </div>
      </CardWrapper>
    </ModalWrapper >
  )
}

export default LoginModal