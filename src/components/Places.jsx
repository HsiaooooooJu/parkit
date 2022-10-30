import usePlacesAutocomplete from 'use-places-autocomplete'

// const placesProps = {
//   // eslint-disable-next-line no-undef
//   setOffice: google.maps.LatLngLiteral
// }

// , { getGeocode, getLatLng }

export default function Places() {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data }
  } = usePlacesAutocomplete()

  console.log({ status, data })

  // clearSuggestions

  // const handleSelect = async () => {
  //   setValue(value, false)
  //   clearSuggestions()

  //   const results = await getGeocode({ value })
  //   const { lat, lng } = await getLatLng(results[0])
  //   setOffice({ lat, lng })
  // }

  return (
    <div className='place-container'>
      {/* user input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className='places-container_input'
        placeholder='Search a parking lot'
      />
      {/* <div className='places-container_select'>
        <select>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <option key={place_id} value={description} />
            ))}
        </select>
      </div> */}
    </div>
  )
}
