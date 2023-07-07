'use client'
import React, { useEffect, useState } from 'react'
import { latLngBounds, latLng } from 'leaflet'
import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents } from 'react-leaflet'
import { useSelector } from 'react-redux'
import uruguay from '../../../geojson/uruguay.json'
import "leaflet.heat"

const HeatMapFunc = ({ handleBlockMap }) => {
  const [layer, setLayer] = useState()
  const map = useMap()
  const { leaks } = useSelector(state => state.leaks)

  useMapEvents({
    click() {
      handleBlockMap(true)
    }
  })

  useEffect(() => {

    if (layer) {
      map.removeLayer(layer)
      setLayer(null)
    }

    if (leaks.length) {
      const points = leaks.map((leak) => {
        return [leak.location.lat, leak.location.lng, 25]
      })
      const layer = L.heatLayer(points)
      setLayer(layer)
      layer.addTo(map)
    }
  }, [leaks])

}

const HeatMap = () => {
  const [blockMap, setBlockMap] = useState(true)
  const topRight = latLng(-29.520002, -52.172543)
  const bottomLeft = latLng(-35.3, -59)
  const bounds = latLngBounds(topRight, bottomLeft)

  return (
    <div className='relative w-full max-w-4xl mx-auto'>
      <div
        onClick={() => setBlockMap(false)}
        className={`${blockMap ? '' : 'hidden'} absolute h-full w-full top-0 left-0 bg-black/50 flex items-center justify-center text-white font-semibold z-[800]`}>
        Haz click para desbloquear o desbloquear el mapa
      </div>
      <MapContainer
        center={[-32.694260, -57.071565]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: 400 }}
        minZoom={6}
        zoomControl={false}
        maxBounds={bounds}
      >
        <HeatMapFunc handleBlockMap={() => { setBlockMap(value => !value) }} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
  )
}

export default HeatMap