'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import MapControlButton from '../button/MapControlButton'
import DeleteButton from '../button/DeleteButton'
import { useSelector, useDispatch } from 'react-redux'
import { sendReport } from '@/store/feature/MapSlice'
import { addLeak, increaseTotalLeaksCounter } from '@/store/feature/LeaksSlice'

const FileInput = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(null)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const { description, center } = useSelector(state => state.map)
  const handleInputChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }
  const handleUpload = (e) => {
    if (file == null) {
      inputRef.current?.click()
    } else {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('description', description)
      formData.append('lat', center.lat)
      formData.append('lng', center.lng)
      setLoading(true)
      fetch('/api/v1/leak', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
          inputRef.current.value = ''
          setFile(null)
          dispatch(sendReport())
          dispatch(increaseTotalLeaksCounter())
          dispatch(addLeak(data.report))
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }
  const handleDelete = () => {
    setFile(null)
    inputRef.current.value = ''
  }

  return (
    <>
      <div className='bg-white rounded-lg shadow-md'>

        <label
          className={`block p-2 cursor-pointer group ${file != null ? 'hidden' : 'visible'}`}
        >
          <div
            className='flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg aspect-square w-full group-hover:border-blue-400 focus-within:border-blue-400'
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
        <div className={`relative w-full aspect-square flex ${file == null ? 'hidden' : 'visible'}`}>
          <img src={file != null ? URL.createObjectURL(file) : ''} alt='Imagen' className='object-contain flex-1' />
          <DeleteButton className='absolute top-2 right-2 z-[100000]' onClick={handleDelete} />
        </div>
      </div>
      <MapControlButton
        style={file != null ? 'green' : 'light-neutral'}
        onClick={handleUpload}
        disabled={loading}
      >
        <span className='font-coolvetica font-semibold text-xl text-white'>
          {
            loading
              ? 'Enviando...'
              : (file != null ? 'Enviar Reporte' : 'Agrega una imagen para continuar')
          }

        </span>
      </MapControlButton>
    </>
  )
}

export default FileInput