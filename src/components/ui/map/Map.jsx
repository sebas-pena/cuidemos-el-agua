'use client'
import { latLngBounds } from 'leaflet'
import { latLng } from 'leaflet'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import argentinaBrazil from '../../../geojson/argentina-brazil.json'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setCenter } from '@/store/feature/MapSlice'

const UpdateCenter = () => {
  const map = useMap()
  const dispatch = useDispatch()
  map.on('moveend', () => {
    const center = map.getCenter()
    console.log(center)
    dispatch(setCenter({
      lat: center.lat,
      lng: center.lng
    }))
  })
  return null;
}

const Map = ({ height, showPointer }) => {
  const topRight = latLng(-29.520002, -52.172543)
  const bottomLeft = latLng(-35.3, -59)
  const bounds = latLngBounds(topRight, bottomLeft)
  const mapState = useSelector(state => state.map)
  const showingCrosshair = mapState.showCrosshair
  const { showCrosshairText, lock } = mapState
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
          maxBounds={bounds}
        >
          <UpdateCenter />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <GeoJSON data={argentinaBrazil} style={{
            color: '#406099',
            fillOpacity: 0.8,
          }} />
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