import Image from 'next/image'
import React from 'react'

const DeleteButton = ({ className = '', ...props }) => {
  return (
    <button
      className={`bg-red-600 hover:bg-red-700 active:bg-red-800 p-2 rounded-md ${className}`}
      {...props}
    >
      <Image src='/svg/trash.svg' width={20} height={20} alt='Eliminar' />
    </button>
  )
}

export default DeleteButton