import React from 'react'
import LoginForm from '@/components/ui/form/LoginForm'

export const metadata = {
  title: 'Iniciar sesión - Cuidemos el Agua',
  description: 'Iniciar sesión en Cuidemos el Agua',
}

const LoginPage = () => {
  return (
    <div className='bg-white/70 py-5 w-full max-w-lg mx-4 rounded-lg backdrop-blur'>
      <header className='text-center font-coolvetica text-2xl text-neutral-800 mb-5'>
        <h1>Iniciar sesión</h1>
      </header>
      <LoginForm />
    </div>
  )
}

export default LoginPage