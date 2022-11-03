import { Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
// import geolib from 'geolib'

import { orange } from '../components/Icons'

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
    <Marker position={position} icon={orange}>
      {children}
    </Marker>
  )
}

// useMap
// import { useEffect } from 'react'
// import L from 'leaflet'

// useEffect(() => {
//   const map = useMap()

//   // Methods: addHandler(<String> name, <Function> HandlerClass)
//   map.on('locationfound', handleOnLocationFound)
//   return () => {
//     // turn it off when the component unmounts
//     map.off('locationfound', handleOnLocationFound)
//   }
// }, [])

// function handleOnLocationFound(e) {
//   const map = useMap()
//   const latlng = e.latlng
//   const marker = L.marker(latlng)

//   marker.addTo(map)

//   // use event location's accuracy property to determine width (meter)
//   const radius = e.accuracy

//   // create a Circle shape and add it to the map like Marker instance.
//   const circle = L.circle(latlng, {
//     radius,
//     color: '#26c6da'
//   })

//   circle.addTo(map)
// }

// function handleOnFindLocation() {
//   const map = useMap()

//   map.locate({
//     setView: true
//   })
// }
