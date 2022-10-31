import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

export default function Places({ setParking }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete()

  console.log({ status, data })

  const handleSelect =
  ({ value }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(value, false)
    clearSuggestions()
    
    console.log(value)
    // Get latitude and longitude via utility functions
    getGeocode({ address: value }).then((results) => {
      const response = getLatLng(results[0])
      console.log(response)
      setParking({response})
    })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const { place_id, description } = suggestion

      return (
        <li key={place_id} className='places-container_list' onClick={handleSelect(suggestion)}>
          {description}
        </li>
      )
    })

  return (
    <div>
      <input
        value={value}
        className='places-container_input'
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder='Search a parking space'
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul className='places-container_select'>{renderSuggestions()}</ul>}
    </div>
  )
}
