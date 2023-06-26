'use client'
import React, { useState } from 'react'
import AuthInput from '../input/AuthInput'
import Image from 'next/image'
import ErrorConfirmEmail from '../modal/ErrorConfirmEmail'
import { useDispatch } from 'react-redux'
import { login } from '@/store/feature/UserSlice'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputErrors, setInputErrors] = useState({})
  const [showSendEmailModal, setShowSendEmailModal] = useState(false)
  const [credentials, setCredentials] = useState(null)

  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = e.target

    const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/
    const inputErros = {}

    if (!emailRegex.test(email.value)) {
      inputErros.email = 'Correo electrónico inválido'
    }

    if (password.value.length == 0) {
      inputErros.password = 'Ingresa tu contraseña'
    }

    if (Object.keys(inputErros).length > 0) {
      setInputErrors(inputErros)
      return
    }

    setIsLoading(true)
    fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
      .then(async res => {
        const data = await res.json()
        if (res.ok) {
          return data
        } else {
          throw new Error(data.code)
        }
      })
      .then(data => {
        const { user } = data
        dispatch(login(user))
        router.push('/')
      })
      .catch(err => {
        if (err.message === "0") {
          setError('Correo o contraseña incorrectos')
        } else if (err.message === "1") {
          setCredentials({ email: email.value, password: password.value })
          setShowSendEmailModal(true)
        } else {
          setError('Algo salió mal')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <form
        className='relative flex flex-col w-full max-w-lg gap-1 mb-5'
        onSubmit={handleSubmit}
      >
        <AuthInput
          title='Correo electrónico'
          error={inputErrors.email}
          name='email'
        />
        <AuthInput
          title='Contraseña'
          type='password'
          error={inputErrors.password}
          name='password'
        />

        <button
          type='submit'
          className="text-lg rounded-md h-9 flex justify-center items-center px-4 mt-5 text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300 disabled:bg-blue-400 "
          disabled={isLoading}
        >
          {
            isLoading ? <Image src='/svg/spinner.svg' alt='loading' width={24} height={24} /> : 'Iniciar Sesión'
          }
        </button>
        {
          error && <p className='w-full font-semibold absolute top-full text-red-500 text-center'>{error}</p>
        }
      </form>
      {
        showSendEmailModal && (
          <div className='absolute top-0 left-0 w-full h-screen'>
            <ErrorConfirmEmail credentials={credentials} handleCloseModal={() => setShowSendEmailModal(false)} />
          </div>
        )
      }
    </>
  )
}

export default LoginForm