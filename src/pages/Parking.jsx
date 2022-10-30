import '../assets/styles/Parking.scss'
import location from '../assets/images/location.svg'

// Memorize the result
// import { useMemo } from 'react'
import { useState, useRef } from 'react'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

export default function Parking() {
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    googleMapsApiKey: 'AIzaSyBtsIYIcok3vNcH8je-V5Z00UGfGom9wIg',
    libraries: ['places']
  })

  const center = { lat: 25.046, lng: 121.513 }

  // setMap to panTo center (set type for the element)
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))

  // getting back direction response (whenever calling directions apis)
  // initial state will be null
  const [directionsResponse, setDirectionsResponse] = useState(null)

  // initial state will be empty string
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  // variables for input element (to have better auto completions in VScode)
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  if (!isLoaded) return <div>Loading...</div>

  async function calculateRoute() {
    if(originRef.current.value === '' || destinationRef === '') {
      return
    }

    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService

    // call the direction service to get the results (return a Promise)
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })

    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  return (
    <>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName='map-container'
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
        onLoad = {(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} /> }
      </GoogleMap>
      <div className="map">
        <button onClick={() => map.panTo(center)}>
          <img src={location} className='map_location' />
        </button>
        <div className="map_input">
          <Autocomplete>
            <input ref={originRef} type="text" placeholder='起點' className='map_input_field' />
          </Autocomplete>
          <Autocomplete>
            <input ref={destinationRef} type="text" placeholder='目的地' className='map_input_field' />
          </Autocomplete>
        </div>
        <button type='submit' className='map_submit' onClick={calculateRoute}>Calculate Route</button>
        <button type='submit' className='map_close' onClick={clearRoute}>X</button>
        <p className='map_info_distance'>Distance: {distance}</p>
        <p className='map_info_duration'>Duration: {duration}</p>
      </div>
    </>
  )
}