/*eslint-disable*/
import { greenPin, redPin, bluePin, grayPin } from '../components/Icons'
import { Marker, Popup, useMap } from 'react-leaflet'
import PopupContent from '../components/PopupContent'

export default function AllMarker(props) {
  const { allPark, currentPosition, isSelected } = props
  const mapTile = useMap()
  const currentLat = currentPosition.lat
  const currentLng = currentPosition.lng

  let content
  let icon

  // filter by nearby
  const distance = allPark.map((item) => {
    return {
      ...item,
      distance: mapTile.distance(
        [currentLat, currentLng],
        [item.latlng.lat, item.latlng.lng]
      )
    }
  })

  const superNear = distance.filter((item) => {
    return item.distance < 300
  })

  const quiteNear = distance.filter((item) => {
    return item.distance < 600
  })

  if (isSelected.nearby === '300m') {
    content = superNear.map((item) => {
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
  } else if (isSelected.nearby === '600m') {
    content = quiteNear.map((item) => {
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
  }

  // filter by vacancy
  if (isSelected.remain === 'many') {
    content = allPark.map((item) => {
      if (item.availableCar > 20) {
        icon = greenPin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      }
    })
  } else if (isSelected.remain === 'some') {
    content = allPark.map((item) => {
      if (item.availableCar < 10 && item.availableCar > 0) {
        icon = bluePin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      }
    })
  } else if (isSelected.remain === 'ignore') {
    content = allPark.map((item) => {
      if (item.availableCar <= 0) {
        icon = redPin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      } else if (item.availableCar > 10) {
        icon = greenPin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      } else if (item.availableCar < 10) {
        icon = bluePin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      }
    })
  } else if (isSelected.remain === 'all') {
    content = allPark.map((item) => {
      if (item.availableCar <= 0) {
        icon = redPin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      } else if (item.availableCar > 10) {
        icon = greenPin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      } else if (item.availableCar < 10) {
        icon = bluePin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      } else if (item.availableCar === '無資料') {
        icon = grayPin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      }
    })
  }
  return <>{content}</>
}

function FilterMarker({ item, icon }) {
  return (
    <Marker position={[item.latlng.lat, item.latlng.lng]} icon={icon}>
      <Popup>
        <PopupContent item={item} />
      </Popup>
    </Marker>
  )
}
