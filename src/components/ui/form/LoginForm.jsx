'use client'
import React, { useState } from 'react'
import AuthInput from '../input/AuthInput'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <form className='relative flex flex-col gap-7'>
      <AuthInput
        title='Correo electrónico'
        type='email'
      />
      <AuthInput
        title='Contraseña'
        type='password'
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