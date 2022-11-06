import { greenPin, redPin, bluePin } from '../components/Icons'
import { Marker, Popup } from 'react-leaflet'
import PopupContent from '../components/PopupContent'

export default function AllMarker(props) {
  const manySpaces = props.allParkRemaining.filter((item) => {
    if (item.availableCar > 20) {
      return item
    }
  })

  const someSpaces = props.allParkRemaining.filter((item) => {
    if (item.availableCar > 10) {
      return item
    }
  })
  const emptySpaces = props.allParkRemaining.filter((item) => {
    if (item.availableCar === 0) {
      return item
    }
  })

  const many = manySpaces.map((item) => (
    <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={greenPin}>
      <Popup>
        <PopupContent item={item} />
      </Popup>
    </Marker>
  ))

  const some = someSpaces.map((item) => (
    <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={bluePin}>
      <Popup>
        <PopupContent item={item} />
      </Popup>
    </Marker>
  ))

  const empty = emptySpaces.map((item) => (
    <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={redPin}>
      <Popup>
        <PopupContent item={item} />
      </Popup>
    </Marker>
  ))

  return (
    <>
      {empty}
      {some}
      {many}
    </>
  )
}
