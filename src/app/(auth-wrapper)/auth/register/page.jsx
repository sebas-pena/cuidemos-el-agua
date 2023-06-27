import RegisterForm from '@/components/ui/form/RegisterForm'
import SimpleLink from '@/components/ui/link/SimpleLink'

export const metadata = {
  title: 'Registrarse - Cuidemos el Agua',
  description: 'Registrarse en Cuidemos el Agua',
}

const RegisterPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[100svh] bg-white/70 py-5 w-full rounded-lg backdrop-blur'>
      <header className='text-center font-coolvetica text-2xl text-neutral-800 mb-5'>
        <h1>Registrarse</h1>
      </header>
      <RegisterForm />
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