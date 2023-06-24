'use client'
import React, { useState } from 'react'
import AuthInput from '../input/AuthInput'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputErrors, setInputErrors] = useState({})

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
          const error = new Error(data.message || 'Something went wrong!')
          throw error
        }
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form
      className='relative flex flex-col w-full max-w-lg gap-7 mb-5'
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
        className="text-lg rounded-md py-1 px-4 text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300 disabled:bg-blue-400 "
        disabled={isLoading}
      >
        Iniciar sesión
      </button>
      {
        error && <p className='w-full font-semibold absolute top-full translate-y-3 text-red-500 text-center'>{error}</p>
      }
    </form>
  )
}

export default LoginForm