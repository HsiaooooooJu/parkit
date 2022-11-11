import { greenPin, redPin, bluePin } from '../components/Icons'
import { Marker, Popup, useMap } from 'react-leaflet'
import PopupContent from '../components/PopupContent'

export default function AllMarker(props) {
  const mapTile = useMap()
  const currentLat = props.currentPosition.lat
  const currentLng = props.currentPosition.lng

  // filter by nearby
  const nearby = props.allPark.reduce((acc, item) => {
    item.distance = mapTile.distance(
      [currentLat, currentLng],
      [item.latlng.lat, item.latlng.lng]
    )
    if (item.distance < 550) {
      acc.push(item)
    }
    return acc
  }, [])

  const many = nearby
    .filter((item) => {
      if (item.availableCar > 10) {
        return item
      }
    })
    .map((item) => (
      <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={greenPin}>
        <Popup>
          <PopupContent item={item} />
        </Popup>
      </Marker>
    ))

  const some = nearby
    .filter((item) => {
      if (item.availableCar < 10 && item.availableCar !== 0) {
        return item
      }
    })
    .map((item) => (
      <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={bluePin}>
        <Popup>
          <PopupContent item={item} />
        </Popup>
      </Marker>
    ))

  const empty = nearby
    .filter((item) => {
      if (item.availableCar === 0) {
        return item
      }
    })
    .map((item) => (
      <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={redPin}>
        <Popup>
          <PopupContent item={item} />
        </Popup>
      </Marker>
    ))

  // filter by availability
  const available = props.allPark.filter((item) => {
    return item.availableCar !== 0
  })
  const manyAvailable = available
    .filter((item) => {
      if (item.availableCar < 10) {
        return item
      }
    })
    .map((item) => (
      <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={bluePin}>
        <Popup>
          <PopupContent item={item} />
        </Popup>
      </Marker>
    ))

  const someAvailable = available
    .filter((item) => {
      if (item.availableCar > 10) {
        return item
      }
    })
    .map((item) => (
      <Marker key={item.id} position={[item.latlng.lat, item.latlng.lng]} icon={greenPin}>
        <Popup>
          <PopupContent item={item} />
        </Popup>
      </Marker>
    ))

  return props.isClicked ? (
    <>
      {manyAvailable}
      {someAvailable}
    </>
  ) : (
    <>
      {many}
      {some}
      {empty}
    </>
  )
}
