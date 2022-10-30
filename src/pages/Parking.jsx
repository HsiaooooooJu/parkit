import '../assets/styles/Parking.scss'

// useMemo memorize the result
import { useMemo, useRef, useCallback } from 'react'
import { useLoadScript, GoogleMap } from '@react-google-maps/api'
import Places from '../components/Places'

// useState
// Marker, DirectionRenderer, Circle, MarkerCluster

// // eslint-disable-next-line no-undef
// const LatLngLiteral = google.maps.LatLngLiteral
// // eslint-disable-next-line no-undef
// const DirectionResults = google.maps.DirectionResults
// // eslint-disable-next-line no-undef
// const MapOptions = google.maps.MapOptions

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
  const mapRef = useRef()
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
    <div>
      <div className="map">
        <Places />
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName='map-container'
          options={options}
          onLoad={onLoad}
        ></GoogleMap>

      </div>
      
    </div>
  )
}