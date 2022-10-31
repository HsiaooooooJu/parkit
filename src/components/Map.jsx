import React, { useState, useMemo } from 'react'
import { GoogleMap, InfoWindow, MarkerF } from '@react-google-maps/api'

const markers = [
  {
    id: 1,
    name: 'Taipei Taipei',
    position: { lat: 25.042, lng: 121.53 }
  },
  {
    id: 2,
    name: 'sth HERE',
    position: { lat: 25.045, lng: 121.53 }
  }
]

function Map() {
  const [activeMarker, setActiveMarker] = useState(null)
  const center = useMemo(() => ({ lat: 25.04, lng: 121.53 }), [])

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  const options = useMemo(
    () => ({
      mapId: '7ae8c2b79e71f6a0',
      zoomControl: true,
      disableDefaultUI: true,
      clickableIcons: false,
    }),[])

  const handleOnLoad = (map) => {
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds()
    markers.forEach(({ position }) => bounds.extend(position))
    map.fitBounds(bounds)
  }

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      options={options}
      onClick={() => setActiveMarker(null)}
      center={center}
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
    >
      {markers.map(({ id, name, position }) => (
        <MarkerF key={id} position={position} onClick={() => handleActiveMarker(id)}>
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </MarkerF>
      ))}
    </GoogleMap>
  )
}

export default Map
