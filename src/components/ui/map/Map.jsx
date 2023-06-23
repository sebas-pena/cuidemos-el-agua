'use client'
import React from 'react'
import L, { latLngBounds, latLng } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import uruguay from '../../../geojson/uruguay.json'
import { setCenter } from '@/store/feature/MapSlice'
import { showReport } from '@/store/feature/AppSlice'
import LocationMarker from './LocationMarker'

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
  const { showCrosshairText, lock, markers } = mapState

  const handleShowReport = (report) => {
    dispatch(showReport(report))
  }

  return (
    <div className='relative'>
      <div className='relative'>
        <div className={`${lock ? 'absolute w-full h-full z-[5000] top-0 left-0' : 'hidden'}`} />
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
            markers.map((report, index) => (
              <Marker
                key={index}
                position={[report.location.lat, report.location.lng]}
                icon={
                  L.icon({
                    iconUrl: '/svg/marker.svg',
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -30],
                  })
                }
                eventHandlers={
                  {
                    click: () => {
                      handleShowReport(report)
                    }
                  }
                }
              />
            ))
          }
          <LocationMarker />
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
          <Image src='/svg/crosshair.svg' width={20} height={20} alt='Reportar' className={`${showPointer ? 'block' : 'hidden'} animate-fade-in absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]`} />
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