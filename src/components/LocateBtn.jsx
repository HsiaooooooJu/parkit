import { useMap, Marker } from 'react-leaflet'
import { useState, useEffect } from 'react'
import L from 'leaflet'
import { locate } from './Icons'
// import orangePin from '../assets/images/pin-orange.svg'

import locationBtn from '../assets/images/location.svg'
// import markerShadow from 'leaflet/dist/images/marker-shadow.png'

export default function LocateBtn() {
  const map = useMap()
  const [position, setPosition] = useState(null)

  useEffect(() => {
    if (!map) return

    // Methods: addHandler(<String> name, <Function> HandlerClass)
    map.on('location found', handleLocationFound)

    return () => {
      // turn it off when the component unmounts
      map.off('location found', handleLocationFound)
    }
  }, [map])

  function handleLocationFound(e) {
    const latlng = e.latlng
    const marker = L.marker(latlng)
    marker.addTo(map)

    setPosition(latlng)
    map.flyTo(position)

    const radius = e.accuracy
    const circle = L.circle(latlng, {
      radius,
      color: '#26c6da'
    })

    circle.addTo(map)
  }

  function findLocation() {
    map.locate({
      setView: true,
      // watch: true, // always watching user position
      maxZoom: 16,
      // timeout: 5000,
      enableHighAccuracy: true
    })
  }

  return position === null ? (
    <button className='map-container_locate'>
      <img src={locationBtn} onClick={findLocation} />
    </button>
  ) : (
    <>
      <button className='map-container_locate'>
        <img src={locationBtn} onClick={findLocation} />
      </button>
      <Marker position={position} icon={locate} />
    </>
  )
}

//======================

// function GetMapCenter() {
//   const map = useMap()
//   // 得到兩點的距離
//   // const dist = map.distance([25.0504753, 121.545543], [25.04754574, 121.5716298])
//   console.log()
//   console.log('map center:', map.getCenter())
//   return null
// }

//======================

// function getLocation() {
//   navigator.geolocation.getCurrentPosition(showPosition, showError)
// }

// // success callBack
// function showPosition(position) {
//   const lat = position.coords.latitude
//   const lng = position.coords.longitude
//   console.log(lat, lng)
//   return [lat, lng]
// }

// // error callBack
// function showError() {
//   alert('無法取得當前位置')
// }

// const position = getLocation()
