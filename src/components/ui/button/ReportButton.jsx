'use client'
import { cancelReport, startReport } from '@/store/feature/MapSlice'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapControlButton from './MapControlButton'
import { showLoginModal } from '@/store/feature/AppSlice'

const ReportButton = () => {
  const dispatch = useDispatch()
  const showingCrosshair = useSelector(state => state.map).showCrosshair
  const { loggedIn } = useSelector(state => state.user)

  const handleClick = () => {
    if (loggedIn === false) {
      dispatch(showLoginModal("Para poder enviar un reporte, debes iniciar sesión."))
      return
    }
    if (showingCrosshair) {
      dispatch(cancelReport())
    } else {
      dispatch(startReport())
    }
  }

  const styles = showingCrosshair
    ? 'neutral'
    : 'red'

  return (
    <MapControlButton
      onClick={handleClick}
      style={styles}
      disabled={loggedIn === null}
    >
      {
        loggedIn === null && (
          <Image src='/svg/spinner.svg' width={28} height={28} alt='Cargando' />
        )
      }
      {
        loggedIn !== null && (
          <>
            <Image src='/svg/report.svg' width={20} height={20} alt='Reportar' />
            <span className='font-coolvetica font-semibold text-xl text-white'>
              {
                showingCrosshair
                  ? 'Cancelar Reporte'
                  : 'Reportar Perdida'
              }
            </span>
          </>
        )
      }
    </MapControlButton>
  )
}

export default ReportButton