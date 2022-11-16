import { greenPin, redPin, bluePin, grayPin } from '../components/Icons'
import { Marker, Popup, useMap } from 'react-leaflet'
import PopupContent from '../components/PopupContent'

export default function AllMarker(props) {
  const mapTile = useMap()
  const currentLat = props.currentPosition.lat
  const currentLng = props.currentPosition.lng

  let icon

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

  const allNearby = nearby.map((item) => {
    if (item.availableCar > 10) {
      icon = greenPin
      return <FilterMarker key={item.id} item={item} icon={icon} />
    } else if (item.availableCar < 10 && item.availableCar !== 0) {
      icon = bluePin
      return <FilterMarker key={item.id} item={item} icon={icon} />
    } else if (item.availableCar === 0) {
      icon = redPin
      return <FilterMarker key={item.id} item={item} icon={icon} />
    } else if (item.availableCar === '無資料') {
      icon = grayPin
      return <FilterMarker key={item.id} item={item} icon={icon} />
    }
  })

  // // filter by availability
  // const available = props.allPark.map((item) => {
  //   if (item.availableCar === 0) return
  //   if (item.availableCar > 10) {
  //     icon = greenPin
  //     return <FilterMarker key={item.id} item={item} icon={icon} />
  //   } else if (item.availableCar < 10) {
  //     icon = bluePin
  //     return <FilterMarker key={item.id} item={item} icon={icon} />
  //   } else if (item.availableCar === '無資料') {
  //     icon = grayPin
  //     return <FilterMarker key={item.id} item={item} icon={icon} />
  //   }
  // })
  return <>{allNearby}</>
}

// props.isClicked ? <>{available}</> : 

function FilterMarker({ item, icon }) {
  return (
    <Marker position={[item.latlng.lat, item.latlng.lng]} icon={icon}>
      <Popup>
        <PopupContent item={item} />
      </Popup>
    </Marker>
  )
}
