import { greenPin, redPin, bluePin } from '../components/Icons'
import { Marker, Popup, useMap } from 'react-leaflet'
import PopupContent from '../components/PopupContent'

export default function AllMarker(props) {
  const mapTile = useMap()
  const currentLat = props.currentPosition.lat
  const currentLng = props.currentPosition.lng

  const distance = props.allPark.map((item) => {
    return {
      ...item,
      distance: mapTile.distance(
        [currentLat, currentLng],
        [item.latlng.lat, item.latlng.lng]
      )
    }
  })

  const nearBy = distance.filter((item) => {
    return item.distance < 550
  })

  const many = nearBy
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

  const some = nearBy
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

  const empty = nearBy
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

  return (
    <>
      {empty}
      {some}
      {many}
    </>
  )
}
