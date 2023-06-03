'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import MapControlButton from '../button/MapControlButton'

const FileInput = () => {
  const [file, setFile] = useState(null)
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }
  const handleUpload = (e) => {
    if (file == null) {
      inputRef.current?.click()
      console.log(inputRef.current)
    } else {
    }
  }
  return (
    <>
      <label
        className='block bg-white rounded-lg shadow-md p-2 cursor-pointer group'
      >
        <div
          className='flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg h-52 w-full group-hover:border-blue-400 focus-within:border-blue-400'
        >
          <Image src='/svg/image.svg' width={50} height={50} alt='Agregar Imagen' />
          <p className='text-[#ccc] font-semibold'>
            Agrega una imagen
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          className='hidden'
          accept='image/*'
          onChange={handleInputChange}
          multiple={false}
        />
      </label>
      <MapControlButton
        style={file != null ? 'green' : 'light-neutral'}
        onClick={handleUpload}
      >
        <span className='font-coolvetica font-semibold text-xl text-white'>
          {file != null ? 'Enviar Reporte' : 'Agrega una imagen para continuar'}
        </span>
      </MapControlButton>
    </>
  )
}

export default FileInput