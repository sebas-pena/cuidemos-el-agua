import React from 'react'
import LoginForm from '@/components/ui/form/LoginForm'
import SimpleLink from '@/components/ui/link/SimpleLink'

export const metadata = {
  title: 'Iniciar sesión - Cuidemos el Agua',
  description: 'Iniciar sesión en Cuidemos el Agua',
}

const LoginPage = () => {
  return (
    <div className='relative flex flex-col items-center justify-center h-screen w-full bg-white/70 py-5 px-4 rounded-lg backdrop-blur'>
      <header className='text-center font-coolvetica text-2xl text-neutral-800 mb-5'>
        <h1>Iniciar sesión</h1>
      </header>
      <LoginForm />
      <p className='text-center'>
        ¿Aún no tienes una cuenta?
        {' '}
        <SimpleLink href='/auth/register' paddingX='px-0' paddingY='py-0'>
          Crear Cuenta
        </SimpleLink>
      </p>
    </div>
  )
}

export default LoginPage