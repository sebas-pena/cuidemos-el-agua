'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLink from '../ui/link/ButtonLink'
import SimpleLink from '../ui/link/SimpleLink'
import { logout } from '@/store/feature/UserSlice'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    setIsLoading(true)
    fetch('/api/v1/auth/logout', {
      method: 'POST'
    })
      .then(res => res.json)
      .then(data => {
        dispatch(logout())
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <header className='relative w-full flex justify-between items-center px-4 bg-white h-16 border-b border-neutral-300'>
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
        <button onClick={() => setShowMenu(!showMenu)}>
          <Image className='md:hidden' src='/svg/hamburguer.svg' alt='menu hamburguesa' width={30} height={30} />
        </button>
        <div className={`absolute md:relative top-full md:top-0 w-full md:w-auto md:left-0 ${showMenu ? "left-0" : "left-full"} bg-white left-0  z-[99999999] flex flex-col md:flex-row gap-4 duration-300`}>
          <SimpleLink href='/noticias'>
            Noticias
          </SimpleLink>
          <SimpleLink href='/consejos'>
            Consejos
          </SimpleLink>
          {
            user.loggedIn === null &&
            <button
              className="text-lg rounded-md py-1 px-4 disabled:bg-blue-400"
              disabled={true}
            >
              <Image src='/svg/spinner.svg' alt='loading' width={24} height={24} />
            </button>
          }
          {
            user.loggedIn === true &&
            <button
              className="text-lg rounded-md py-1 px-4 text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300 disabled:bg-blue-400"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {
                isLoading
                  ? <Image src='/svg/spinner.svg' alt='loading' width={24} height={24} />
                  : "Cerrar sesión"
              }
            </button>

          }
          {
            user.loggedIn === false &&
            <ButtonLink href='/auth/login'>
              Iniciar sesión
            </ButtonLink>
          }
        </div>
      </div>
    </header>
  )
}

export default Header