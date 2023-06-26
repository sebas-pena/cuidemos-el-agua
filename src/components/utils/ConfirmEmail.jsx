'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import SimpleLink from '../ui/link/SimpleLink'

const ConfirmEmail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [emailConfirmed, setEmailConfirmed] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    setIsLoading(true)
    fetch('/api/v1/auth/confirm-mail', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
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
        setEmailConfirmed(true)
      })
      .catch(err => {
        setEmailConfirmed(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className='flex flex-col w-full max-w-4xl py-7 h-screen mx-auto font-coolvetica'>
      <h1 className='inline-flex gap-2 items-center'>
        <Image src='/svg/logo.svg' alt='logo de cuidemos el agua' width={30} height={30} />
        <span className='font-coolvetica font-semibold text-3xl text-[#406099]'>
          Cuidemos el Agua
        </span>
      </h1>
      <div className='h-1 my-7 w-full bg-blue-300' />
      <div className='text-center text-xl text-neutral-700'>
        {isLoading && !emailConfirmed && (
          <>
            <p>
              Estamos procesando la confirmación de tu correo electrónico.
            </p>
            <p>
              Esto puede tomar unos segundos . . .
            </p>
          </>
        )}
        {
          !isLoading && emailConfirmed && (
            <>
              <p className='mb-5'>
                ¡Correo confirmado con éxito!
              </p>
              <p>
                Vuelve a iniciar sesión para continuar
              </p>
              <SimpleLink fontSize='text-xl' paddingX='px-0' href='/auth/login'>Iniciar sesión</SimpleLink>
            </>
          )
        }
        {
          !isLoading && !emailConfirmed && (
            <>
              <p className='mb-5'>
                ¡Tu correo electrónico no ha podido confirmar!
              </p>
              <p>
                Si aún no has creado una cuenta, puedes hacerlo <SimpleLink fontSize='text-xl' paddingX='px-0' href='/auth/register'>aquí</SimpleLink>
              </p>
              <p>
                Si ya tienes una cuenta, puedes iniciar sesión <SimpleLink fontSize='text-xl' paddingX='px-0' href='/auth/login'>aquí</SimpleLink>
              </p>
              <p className='mt-3'>
                Si crees que esto es un error, puedes contactarnos:
              </p>
              <SimpleLink fontSize='text-xl' href='mailto:cuidemos.el.agua.uy@gmail.com' >
                cuidemos.el.agua.uy@gmail.com
              </SimpleLink>
            </>
          )
        }
      </div>
    </div>
  )
}

export default ConfirmEmail