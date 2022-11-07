import { greenPin, redPin, bluePin } from '../components/Icons'
import { Marker, Popup, useMap } from 'react-leaflet'
import PopupContent from '../components/PopupContent'

export default function AllMarker(props) {
  const mapTile = useMap()

  const currentLat = props.currentPosition.lat
  const currentLng = props.currentPosition.lng

  let park = props.allPark

  const distance = park.map((item) => {
    return {
      id: item.id,
      distance: mapTile.distance(
        [currentLat, currentLng],
        [item.latlng.lat, item.latlng.lng]
      )
    }
  })

  const nearBy = distance.filter((item) => {
    return item.distance < 500
  })

  console.log(distance)
  console.log(nearBy)

  const emptySpaces = props.allPark.filter((item) => {
    if (item.availableCar === 0) {
      return item
    }
  })

  const someSpaces = props.allPark.filter((item) => {
    if (item.availableCar < 10 && item.availableCar !== 0) {
      return item
    }
  })

  const manySpaces = props.allPark.filter((item) => {
    if (item.availableCar >= 10) {
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
