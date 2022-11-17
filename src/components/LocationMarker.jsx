import { useMap, Marker } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { locate } from './Icons'
import locationBtn from '../assets/images/location.svg'
import { getPosition } from '../apis/ParkingAPI'

export default function LocateBtn({ center, passData }) {
  const map = useMap()
  const [position, setPosition] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    } else if (
      !isLoading &&
      (position[0] > 24 ||
        position[0] < 25.3 ||
        position[1] > 121.4 ||
        position[1] < 121.7)
    ) {
      map.flyTo(center)
      alert('您的當前位置不在台北市，地圖將顯示預設中心點')
      passData(center)
      return
    } else if (!isLoading && position.length > 0) {
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
