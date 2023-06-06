import Image from 'next/image'
import React from 'react'

const CloseButton = ({ className = '', ...props }) => {
  return (
    <button
      className={`bg-red-600 hover:bg-red-700 active:bg-red-800 p-1 rounded-md ${className}`}
      {...props}
    >
      <Image src='/svg/cross.svg' width={18} height={18} alt='Eliminar' />
    </button>
  )
}

export default CloseButton