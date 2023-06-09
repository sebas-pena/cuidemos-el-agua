'use client'

import React, { useState } from 'react'
import AuthInput from '../input/AuthInput'
import PhoneInput from '../input/PhoneInput'
import Image from 'next/image'
import EmailModal from '../modal/EmailModal'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputsErrors, setInputsErrors] = useState({})
  const [showSendEmailModal, setShowSendEmailModal] = useState(false)
  const [emailProvider, setEmailProvider] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password, 'confirm-password': confirmPassword, 'phone-number': phoneNumber } = e.target

    const errorMessage = {}
    const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/
    const phoneRegex = /^0?9\d{7}$/

    if (email.value.length === 0) {
      errorMessage.email = 'El correo electrónico es requerido'
    } else {
      if (!emailRegex.test(email.value)) {
        errorMessage.email = 'El correo electrónico no es válido'
      }
    }

    if (password.value.length < 8) {
      errorMessage.password = 'La contraseña debe tener al menos 8 caracteres'
    } else {
      if (password.value !== confirmPassword.value) {
        errorMessage.confirmPassword = 'Las contraseñas no coinciden'
      }
    }

    if (phoneNumber.value.length === 0) {
      errorMessage.phoneNumber = 'El número de teléfono es requerido'
    } else {
      if (!phoneRegex.test(phoneNumber.value)) {
        errorMessage.phoneNumber = 'El número de teléfono no es válido'
      }
    }

    if (Object.keys(errorMessage).length > 0) {
      setInputsErrors(errorMessage)
      return
    }

    setInputsErrors({})
    setIsLoading(true)

    fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        phone: phoneNumber.value
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Error al crear la cuenta')
        }
      })
      .then(data => {
        setEmailProvider(email.value.split('@')[1])
        setShowSendEmailModal(true)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleCloseModal = () => {
    setShowSendEmailModal(false)
  }

  return (
    <>
      <form
        className='relative flex flex-col w-full gap-1 max-w-lg mx-auto px-4 pb-4'
        onSubmit={handleSubmit}
      >
        <AuthInput
          title='Correo electrónico'
          name='email'
          error={inputsErrors.email}
        />
        <AuthInput
          title='Contraseña'
          type='password'
          name='password'
          error={inputsErrors.password}
        />
        <AuthInput
          title='Confirmar Contraseña'
          type='password'
          name='confirm-password'
          error={inputsErrors.confirmPassword}
        />
        <PhoneInput
          title='Numero de telefono'
          name='phone-number'
          error={inputsErrors.phoneNumber}
        />
        <button
          type='submit'
          className="text-lg rounded-md h-9 flex justify-center items-center px-4 mt-5 text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300 disabled:bg-blue-400 "
          disabled={isLoading}
        >
          {
            isLoading ? <Image src='/svg/spinner.svg' alt='loading' width={24} height={24} /> : 'Crear Cuenta'
          }
        </button>
        {
          error && <p className='w-full font-semibold absolute top-full text-red-500 text-center'>{error}</p>
        }
      </form>
      {
        showSendEmailModal && (
          <EmailModal
            handleCloseModal={handleCloseModal}
            emailProvider={emailProvider}
          />
        )
      }
    </>
  )
}

export default RegisterForm