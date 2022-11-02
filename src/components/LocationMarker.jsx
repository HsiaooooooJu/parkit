import { Marker } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import { Icon } from 'leaflet'

import orangePin from '../assets/images/pin-orange.svg'

export default function LocationMarker({ children }) {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    }
  })

  return position === null ? null : (
    <Marker
      position={position}
      icon={new Icon({ iconUrl: orangePin, iconSize: [40, 40], popupAnchor: [0, -20] })}
    >
      {children}
    </Marker>
  )
}
