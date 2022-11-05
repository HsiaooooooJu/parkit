import { stall } from '../components/Icons'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { converter } from '../utils/Converter'
import osm from '../utils/OsmProvider'
import PopupContent from '../components/PopupContent'
import LocationMarker from '../components/LocationMarker'

import Button from '../components/Button'
import Loading from '../components/Loading'


export default function Parking() {
  // 得到停車場 id
  const parkId = parkData.data.park.map((p) => {
    return p.id
  })

  const parkName = parkData.data.park.map((p) => {
    return p.name
  })

  // console.log(parkName)

  // 得到停車場的座標，陣列資料
  let showCoord = parkData.data.park.map((p) => {
    return p.EntranceCoord.EntrancecoordInfo
  })

  // showCoord = showCoord.filter((item) => {
  //   return item !== undefined
  // })
  console.log(showCoord)

  // 僅保留一個停車場的座標
  const coordInfo = showCoord.map((value) => {
    if (value.length > 1) {
      value.splice(1, value.length - 1)
    }
    return value
  })

  // 處理無資料、停車場座標的型別
  const code = coordInfo.map((value) => {
    if (!value) return
    return [Number(value[0].Xcod), Number(value[0].Ycod)]
  })

  // 把兩筆陣列資料彙整方便 map <Marker />
  const parkInfo = parkId.map((value, index) => {
    return { id: value, code: code[index], name: parkName[index] }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [allPark, setAllPark] = useState([])
  const [parkRemaining, setParkRemaining] = useState([])
  const navigate = useNavigate()

  const fetchAllPark = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json'
      )
      if (!response.ok) {
        throw new Error('發生錯誤')
      }
      const { data } = await response.json()
      const park = data.park.slice(20, 30).map((item) => {
        const latlng = converter(item.tw97x, item.tw97y)
        return {
          id: item.id,
          name: item.name,
          address: item.address,
          latlng,
          serviceTime: item.serviceTime,
          totalCar: item.totalcar,
          totalMotor: item.totalmotor,
          fareWork: item.FareInfo.WorkingDay,
          fareHoliday: item.FareInfo.Holiday
        }
      })
      setAllPark(park)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  // prevent infinite loop from useState
  // (which will update when content change)
  useEffect(() => {
    fetchAllPark()
  }, [fetchAllPark])

  // fetch parking lots' vacancy data
  const fetchParkRemaining = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json'
      )

      if (!response.ok) {
        throw new Error('發生錯誤')
      }
      const { data } = await response.json()
      const changeRemaining = data.park.slice(20, 30)

      setParkRemaining(changeRemaining)
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
    setIsLoading(false)
  }, [])

  
  useEffect(() => {
    fetchParkRemaining()
  }, [fetchParkRemaining])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    alert(error)
    return navigate('/')
  }

  return (
    <div id='map'>
      <MapContainer center={[25.0504753, 121.545543]} zoom={14} scrollWheelZoom={false}>
        <Button />

        <TileLayer attribution={osm.maptile.attribution} url={osm.maptile.url} />

        {allPark.map((item) => (
          <Marker
            key={item.id}
            position={[item.latlng.lat, item.latlng.lng]}
            icon={stall}
          >
            <Popup>
              <PopupContent key={item.id} name={item.name}  />
            </Popup>
          </Marker>
        ))}

        <LocationMarker>
          <Popup>You are here</Popup>
        </LocationMarker>
      </MapContainer>
    </div>
  )
}
