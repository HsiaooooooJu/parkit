import '../assets/styles/Parking.scss'

// // useMemo memorize the result
// import { useMemo, useRef, useCallback } from 'react'
// import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'

// export default function Parking() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ['places']
//   })

//   if (!isLoaded) {
//     return <div className='map-loading'>Loading...</div>
//   }
//   return <Map />
// }

// function Map() {
//   // save the position
//   const mapRef = useRef()

//   // useMemo: tell React to generate the value once and reuse, unless one of the dependency change which is the second array
//   const center = useMemo(() => ({ lat: 25.04, lng: 121.53 }), [])

//   const options = useMemo(
//     () => ({
//       mapId: '7ae8c2b79e71f6a0',
//       disableDefaultUI: true,
//       clickableIcons: false
//     }),
//     []
//   const onLoad = useCallback((map) => (mapRef.current = map), [])

//   return (
//     <div className='map'>
//       <GoogleMap
//         zoom={14}
//         center={center}
//         mapContainerClassName='map-container'
//         options={options}
//         onLoad={onLoad}
//       >
//         <MarkerF position={{ lat: 25.04, lng: 121.53 }}></MarkerF>
//       </GoogleMap>
//     </div>
//   )
// }

// import { useLoadScript, GoogleMap, InfoWindow, MarkerF } from '@react-google-maps/api'
// import React, { useState } from 'react'

// const markers = [
//   {
//     id: 1,
//     name: 'Taipei',
//     position: { lat: 25.04, lng: 121.53 }
//   },
//   {
//     id: 2,
//     name: 'sth',
//     position: { lat: 25.2, lng: 121.53 }
//   }
// ]

// export default function Parking() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
//   })

//   if (!isLoaded) {
//     return <div>Loading...</div>
//   }
//   return <Map />
// }

// function Map() {

//   const [activeMarker, setActiveMarker] = useState(null)
//   const handleActiveMarker = (marker) => {
//     if (marker === activeMarker) {
//       return
//     }
//     setActiveMarker(marker)
//   }

//   const handleOnLoad = (map) => {
//     // eslint-disable-next-line no-undef
//     const bounds = new google.maps.LatLngBounds()
//     markers.forEach(({ position }) => bounds.extend(position))
//     map.fitBounds(bounds)
//   }

//   return (
//     <GoogleMap onLoad={handleOnLoad} onClick={() => setActiveMarker(null)} zoom={14} mapContainerClassName='map-container'>
//       {markers.map(({id, name, position}) => (
//         <MarkerF key={id} position={position} onClick={() => handleActiveMarker(id)}>
//           {activeMarker === id ? (
//             <InfoWindow onCloseClick={() => setActiveMarker(null)}>
//               <div>{name}</div>
//             </InfoWindow>
//           ) : null}
//         </MarkerF>
//       ))}
//     </GoogleMap>
//   )
// }

import { useLoadScript } from '@react-google-maps/api'
import Navbar from '../components/Navbar'
import Map from '../components/Map'

function LoadMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  return isLoaded ? <Map /> : <div className='map-loading'>Loading...</div>
}

export default function Parking() {
  return (
    <>
      <Navbar />
      <LoadMap />
    </>
  )
}