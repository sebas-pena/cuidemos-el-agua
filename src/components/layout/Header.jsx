import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='w-full bg-white p-4'>
      <h1 className='flex gap-2 items-center'>
        <Image src='/svg/logo.svg' alt='logo de cuidemos el agua' width={30} height={30} />
        <span className='font-coolvetica font-semibold text-3xl text-[#406099]'>
          Cuidemos el Agua
        </span>
        <Image src='/svg/logo-ceibal.svg' alt='logo ceibal' width={26} height={26} />
      </h1>
    </header>
  )
}

export default Header