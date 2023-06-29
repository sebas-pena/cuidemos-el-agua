'use client'
import React, { useEffect } from 'react'
import { latLngBounds, latLng } from 'leaflet'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import uruguay from '../../../geojson/uruguay.json'
import { setCenter } from '@/store/feature/MapSlice'
import LeakMarker from './LeakMarker'
import { hideLeak } from '@/store/feature/LeaksSlice'

const UpdateCenter = () => {
  const map = useMap()
  const dispatch = useDispatch()
  map.on('moveend', () => {
    const center = map.getCenter()
    dispatch(setCenter({
      lat: center.lat,
      lng: center.lng
    }))
  })
  return null;
}

const Map = ({ height, showPointer }) => {
  const dispatch = useDispatch()
  const topRight = latLng(-29.520002, -52.172543)
  const bottomLeft = latLng(-35.3, -59)
  const bounds = latLngBounds(topRight, bottomLeft)
  const mapState = useSelector(state => state.map)
  const showingCrosshair = mapState.showCrosshair
  const { showCrosshairText, lock } = mapState
  const { leaks, solvedLeaks } = useSelector(state => state.leaks)

  useEffect(() => {
    dispatch(hideLeak())
  }, [])

  return (
    <div className='relative'>
      <div className='relative'>
        <div className={`${lock ? 'absolute w-full h-full z-[701] top-0 left-0' : 'hidden'}`} />
        <MapContainer
          center={[-32.694260, -57.071565]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height }}
          minZoom={7}
          zoomControl={false}
          maxBounds={bounds}
        >
          <UpdateCenter />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            leaks.map((report) => (
              <LeakMarker
                key={report._id}
                lat={report.location.lat}
                lng={report.location.lng}
                id={report._id}
                closedAt={report.closedAt}
              />
            ))
          }
          {
            solvedLeaks.map((report) => (
              <LeakMarker
                key={report._id}
                lat={report.location.lat}
                lng={report.location.lng}
                id={report._id}
                closedAt={report.closedAt}
              />
            ))
          }
          <GeoJSON
            data={uruguay}
            style={{
              color: '#406099',
              fillOpacity: 0.6,
            }}
            eventHandlers={
              {
                click: (event) => {
                  console.log({ event })
                }
              }
            }
          />
        </MapContainer >
      </div>
      {
        showingCrosshair && (
          <Image src='/svg/crosshair.svg' width={20} height={20} alt='Reportar' className={`${showPointer ? 'block' : 'hidden'} animate-fade-in absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[701]`} />
        )
      }
      {
        showCrosshairText && (

          <p className={`${showPointer ? 'block' : 'hidden'} text-center animate-fade-in absolute bottom-10 font-semibold text-xl text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-black py-2 px-4 rounded-lg bg-opacity-70 select-none`}>
            Centra el mapa en el lugar donde se encuentra la perdida
          </p>
        )
      }
    </div>
  )
}

export default Map