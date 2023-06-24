import RegisterForm from '@/components/ui/form/RegisterForm'
import SimpleLink from '@/components/ui/link/SimpleLink'

export const metadata = {
  title: 'Registrarse - Cuidemos el Agua',
  description: 'Registrarse en Cuidemos el Agua',
}

const RegisterPage = () => {
  return (
    <div className='bg-white/70 py-5 w-full max-w-lg mx-4 rounded-lg backdrop-blur'>
      <header className='text-center font-coolvetica text-2xl text-neutral-800 mb-5'>
        <h1>Registrarse</h1>
      </header>
      <div className='pb-5'>
        <RegisterForm />
      </div>
      <p className='text-center'>
        ¿Ya tienes una cuenta?
        {' '}
        <SimpleLink href='/auth/login' paddingX='px-0' paddingY='py-0'>
          Iniciar sesión
        </SimpleLink>
      </p>
    </div>
  )
}

export default RegisterPage