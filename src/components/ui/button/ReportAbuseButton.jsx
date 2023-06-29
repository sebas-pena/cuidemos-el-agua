'use client'
import { showLoginModal } from '@/store/feature/AppSlice'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const REPORT_OPTIONS = [
  {
    id: 1,
    name: 'Contenido inapropiado',
  },
  {
    id: 2,
    name: 'Falso reporte',
  }
]

const ReportAbuseButton = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [error, setError] = useState(null)
  const [reported, setReported] = useState(false)
  const { loggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleShowOptions = () => {
    if (loggedIn === false) {
      dispatch(showLoginModal("Por favor inicia sesión para poder reportar."))
      return
    }
    setShowOptions(!showOptions)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.report-abuse-btn-list') === null && !e.target.closest('.report-abuse-btn')) {
        setShowOptions(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleReport = (reason) => {
    if (loggedIn === false) {
      dispatch(showLoginModal("Por favor inicia sesión para poder reportar."))
      return
    }
    if (isLoading) return
    setIsLoading(true)
    setShowOptions(false)
    fetch(`/api/v1/leak/${props.id}/report`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        reason,
      })
    })
      .then(async res => {
        return {
          ok: res.ok,
          data: await res.json()
        }
      })
      .then(data => {
        if (data.ok) {
          setReported(true)
        } else {
          setError(true)
        }
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="relative">
      <button
        className="flex py-1 px-2 gap-2 items-center bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md report-abuse-btn"
        {...props}
        onClick={handleShowOptions}
        disabled={isLoading || reported}
      >
        {
          reported &&
          <>
            <Image src='/svg/tick.svg' width={18} height={18} alt='reportado' />
            <p className='leading-none text-white font-semibold'>
              Reportado
            </p>
          </>
        }

        {
          !reported && <>
            <Image src={isLoading ? '/svg/spinner.svg' : '/svg/report.svg'} width={18} height={18} alt={isLoading ? 'cargando' : 'reportar icono'} />
            <p className='leading-none text-white font-semibold'>
              {isLoading ? 'Reportando...' : 'Reportar'}
            </p>
          </>
        }
      </button>
      {
        showOptions && !isLoading && (
          <ul className='report-abuse-btn-list absolute top-full w-max z-[703] flex flex-col bg-white '>
            {
              REPORT_OPTIONS.map((option) => (
                <li
                  key={option.id}
                  className='flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleReport(option.id)}
                >
                  <p className='leading-none text-mine-shaft-600 font-semibold'>
                    {option.name}
                  </p>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}

export default ReportAbuseButton 