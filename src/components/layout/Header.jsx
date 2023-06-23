'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import ButtonLink from '../ui/link/ButtonLink'
import SimpleLink from '../ui/link/SimpleLink'

const Header = () => {
  const user = useSelector(state => state.user)
  return (
    <header className='w-full flex justify-between items-center px-4 bg-white h-16 overflow-hidden'>
      <Link href="/">
        <h1 className='inline-flex gap-2 items-center'>
          <Image src='/svg/logo.svg' alt='logo de cuidemos el agua' width={30} height={30} />
          <span className='font-coolvetica font-semibold text-3xl text-[#406099]'>
            Cuidemos el Agua
          </span>
          <Image src='/svg/logo-ceibal.svg' alt='logo ceibal' width={26} height={26} />
        </h1>
      </Link>
      <div className='flex gap-4'>
        <Image className='md:hidden' src='/svg/hamburguer.svg' alt='menu hamburguesa' width={30} height={30} />
        <SimpleLink href='/noticias'>
          Noticias
        </SimpleLink>
        <SimpleLink href='/consejos'>
          Consejos
        </SimpleLink>
        {
          user.loggedIn
            ? <ButtonLink href='/auth/logout'>
              Cerrar sesión
            </ButtonLink>
            : <ButtonLink href='/auth/login'>
              Iniciar sesión
            </ButtonLink>
        }
      </div>
    </header>
  )
}

export default Header