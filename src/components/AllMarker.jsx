/*eslint-disable*/
import { greenPin, redPin, bluePin, grayPin } from '../components/Icons'
import { Marker, Popup, useMap } from 'react-leaflet'
import PopupContent from '../components/PopupContent'

export default function AllMarker(props) {
  const mapTile = useMap()
  const currentLat = props.currentPosition.lat
  const currentLng = props.currentPosition.lng

  let content
  let icon

  // filter by nearby
  const superNear = props.allPark.reduce((acc, item) => {
    item.distance = mapTile.distance(
      [currentLat, currentLng],
      [item.latlng.lat, item.latlng.lng]
    )
    if (item.distance < 550) {
      acc.push(item)
    }
    return acc
  }, [])

  

  // content = superNear.map((item) => {
  //   if (item.availableCar > 10) {
  //     icon = greenPin
  //     return <FilterMarker key={item.id} item={item} icon={icon} />
  //   } else if (item.availableCar < 10 && item.availableCar !== 0) {
  //     icon = bluePin
  //     return <FilterMarker key={item.id} item={item} icon={icon} />
  //   } else if (item.availableCar === 0) {
  //     icon = redPin
  //     return <FilterMarker key={item.id} item={item} icon={icon} />
  //   } else if (item.availableCar === '無資料') {
  //     icon = grayPin
  //     return <FilterMarker key={item.id} item={item} icon={icon} />
  //   }
  // })

  // filter by vacancy
  if (props.isSelected.remain === 'many') {
    content = props.allPark.map((item) => {
      if (item.availableCar > 20) {
        icon = greenPin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      }
    })
  } else if (props.isSelected.remain === 'some') {
    content = props.allPark.map((item) => {
      if (item.availableCar < 10 && item.availableCar > 0) {
        icon = bluePin
        return <FilterMarker key={item.id} item={item} icon={icon} />
      }
    })
  } else if (props.isSelected.remain === 'ignore') {
    content = props.allPark.map((item) => {
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
  } else if (props.isSelected.remain === 'all') {
    content = props.allPark.map((item) => {
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
