'use client'
import { latLngBounds } from 'leaflet'
import { latLng } from 'leaflet'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
const topRight = latLng(-29.920002, -53.172543)
const bottomLeft = latLng(-34.934762, -58.398550)
const bounds = latLngBounds(topRight, bottomLeft)
const Map = ({ height }) => {
  return (
    <MapContainer
      center={[-32.694260, -57.071565]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height }}
      minZoom={7}
      maxBounds={bounds}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer >
  )
}

export default Map