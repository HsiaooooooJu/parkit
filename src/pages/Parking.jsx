import '../assets/styles/Parking.scss'
// import pinBlue from '../assets/images/pin-blue.svg'

// useMemo memorize the result
import { useMemo, useRef, useCallback, useState } from 'react'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import Places from '../components/Places'

// DirectionRenderer, Circle, MarkerCluster

export default function Parking() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return <Map />
}

function Map() {
  // save the position
  const mapRef = useRef()
  const [parking, setParking] = useState()

  // useMemo: tell React to generate the value once and reuse, unless one of the dependency change which is the second array
  const center = useMemo(() => ({ lat: 25.04, lng: 121.53 }), [])
  const options = useMemo(
    () => ({
      mapId: '7ae8c2b79e71f6a0',
      disableDefaultUI: true,
      clickableIcons: false
    }),
    []
  )
  // useCallback: to optimize rerender with a function that's going to be called
  const onLoad = useCallback((map) => (mapRef.current = map), [])

  return (
    <div className='map'>
      <Places
        setParking={(position) => {
          // update parking state and move map to the location
          setParking(position)
          mapRef.current.panTo(position)
        }}
      />
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
      >
        {parking && <Marker position={parking} />}
      </GoogleMap>
    </div>
  )
}
