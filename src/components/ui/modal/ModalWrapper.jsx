'use client'
import React from 'react'

const ModalWrapper = ({ children, handleClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }
  return (
    <div className='absolute w-full h-[100svh] top-0 left-0 z-[800]'>
      <div
        onClick={handleClickOutside}
        className='modal-wrapper w-full h-full flex items-center justify-center bg-black/30 px-4'
      >
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper