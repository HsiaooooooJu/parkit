import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

// , { getGeocode, getLatLng }

// function setParking() {
//   // eslint-disable-next-line no-undef
//   return google.maps.LatLngLiteral
// }

export default function Places(setParking) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete()

  console.log({ status, data })

  const handleSelect = async () => {
    setValue(value, false)
    clearSuggestions()

    const results = await getGeocode({ value })
    const { lat, lng } = await getLatLng(results[0])
    setParking({ lat, lng })
  }

  return (
    <div className='place-container' onSelect={handleSelect}>
      {/* user input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className='places-container_input'
        placeholder='Search a parking space'
      />
      <div className='places-container_select'>
        <div className='places-container_select_list'>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <li key={place_id}>{description}</li>
            ))}
        </div>
      </div>
    </div>
  )
}
