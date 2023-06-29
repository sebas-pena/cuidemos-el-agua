'use client'
import React, { memo } from 'react'
import L from 'leaflet'
import { Marker } from 'react-leaflet'
import { useDispatch } from 'react-redux'
import { showLeak } from '@/store/feature/LeaksSlice'

const LeakMarker = memo(({ lat, lng, id, closedAt }) => {
  const dispatch = useDispatch()
  const handleShowReport = () => {
    dispatch(showLeak(id))
  }
  return (
    <Marker
      position={[lat, lng]}
      icon={
        L.icon({
          iconUrl: closedAt ? '/svg/solved-leaks-marker.svg' : '/svg/marker.svg',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        })
      }
      eventHandlers={
        {
          click: () => {
            handleShowReport()
          }
        }
      }
    />
  )
})

export default LeakMarker