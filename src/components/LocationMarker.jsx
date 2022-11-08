import { useMap, Marker } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { locate } from './Icons'
import locationBtn from '../assets/images/location.svg'

export default function LocateBtn({ center, passData }) {
  const map = useMap()
  const [position, setPosition] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const option = {
    enableHighAccuracy: true,
  }
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, option)
    })
  }
  useEffect(() => {
    setIsLoading(true)
    getPosition()
      .then((position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setPosition([lat, lng])
        return position
      })
      .catch((error) => {
        if (error.code === 1) {
          alert('請開啟定位功能')
        } else {
          map.flyTo(center)
          alert('無法取得當前位置，請稍後再試')
        }
      })
    setIsLoading(false)
  }, [])

  function handleClick() {
    if (position === null) {
      map.flyTo(center)
      alert('無法取得當前位置，請稍後再試')
      return
    } else if (isLoading) {
      map.flyTo(center)
      return
    } else {
      map.flyTo(position)
      const location = {
        lat: position[0],
        lng: position[1]
      }
      passData(location)
    }
  }

  return position === null ? (
    <>
      <button disabled className='map-container_locate'>
        <img src={locationBtn} />
      </button>
    </>
  ) : (
    <>
      <Marker position={position} icon={locate} />
      <button className='map-container_locate' onClick={handleClick}>
        <img src={locationBtn} />
      </button>
    </>
  )
}
