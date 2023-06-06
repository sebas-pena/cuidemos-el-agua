'use client'
import { setTotalReports } from '@/store/feature/AppSlice'
import { setMarkers } from '@/store/feature/MapSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const StoreInitializer = () => {
  const dispatch = useDispatch()
  const getMarkers = async () => {
    const res = await fetch('/api/v1/report')
    const data = await res.json()
    dispatch(setMarkers(data))
    dispatch(setTotalReports(data.length))
  }

  useEffect(() => {
    getMarkers()
  }, [])
  return null
}

export default StoreInitializer