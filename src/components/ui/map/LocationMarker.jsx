'use client'

import { useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from 'leaflet'

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        setPosition([lat, lng]);
        map.flyTo([lat, lng], 13);
        if (position.coords.accuracy < 20) {
          const radius = position.coords.accuracy
          const circle = L.circle([lat, lng], radius);
          circle.addTo(map);
        }
      })
    }
  }, [map]);

  return position === null ? null : (
    <Marker
      position={position}
      icon={
        L.icon({
          iconUrl: '/svg/pipe.svg',
          iconSize: [10, 10],
          iconAnchor: [5, 10],
        })
      }
    />
  );
}

export default LocationMarker;