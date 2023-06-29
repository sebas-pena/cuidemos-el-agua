'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'
import { setMarkers } from '@/store/feature/MapSlice'
import { setLeaks, setSolvedLeaks, setSolvedLeaksCounter, setTotalLeaksCounter } from '@/store/feature/LeaksSlice'
import { login, logout } from '@/store/feature/UserSlice'

const StoreInitializer = () => {
  const dispatch = useDispatch()
  const pathname = usePathname()

  const getMarkers = async () => {
    if (!pathname.startsWith('/auth')) {
      fetch('/api/v1/user/me')
        .then(res => res.json())
        .then(data => {
          dispatch(login(data.user))
        })
        .catch(() => {
          dispatch(logout())
        })
    }

    fetch('/api/v1/leak?solved=true')
      .then(res => res.json())
      .then(data => {
        dispatch(setLeaks(data.unsolvedLeaks))
        dispatch(setTotalLeaksCounter(data.totalLeaks))
        dispatch(setSolvedLeaksCounter(data.totalSolvedLeaks))
        dispatch(setSolvedLeaks(data.solvedLeaks))
        dispatch(setMarkers(data.unsolvedLeaks))
      })
  }

  useEffect(() => {
    getMarkers()
  }, [])
  return null
}

export default StoreInitializer