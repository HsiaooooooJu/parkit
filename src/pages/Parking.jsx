import { MapContainer, TileLayer, Popup } from 'react-leaflet'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { converter } from '../utils/Converter'
import osm from '../utils/OsmProvider'
import LocationMarker from '../components/LocationMarker'

import Button from '../components/Button'
import Loading from '../components/Loading'
import AllMarker from '../components/AllMarker'


export default function Parking() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allPark, setAllPark] = useState([])
  const [parkRemaining, setParkRemaining] = useState([])
  const navigate = useNavigate()

  const fetchAllPark = useCallback(async () => {
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
          fareWorkday: item.FareInfo.WorkingDay,
          fareHoliday: item.FareInfo.Holiday
        }
      })
      setAllPark(park)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  // To immediately fetch data when user enter this page
  // whenever fetchAllPark changes it will execute
  // which may cause infinite loop
  // add useCallback above to prevent
  useEffect(() => {
    fetchAllPark()
  }, [fetchAllPark])

  // fetch parking lots' vacancy data
  const fetchParkRemaining = useCallback(async () => {
    setError(null)
    try {
      const response = await fetch(
        'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json'
      )

      if (!response.ok) {
        throw new Error('發生錯誤')
      }
      const { data } = await response.json()
      const changeRemaining = data.park.slice(20, 30).map((item) => {
        return {
          id: item.id,
          availableCar: item.availablecar > 0 ? item.availablecar : 0,
        }
      })

      setParkRemaining(changeRemaining)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  // useEffect should not pass a Promise
  useEffect(() => {
    fetchParkRemaining()
  }, [fetchParkRemaining])

  let content

  if (error) {
    alert(error)
    return navigate('/')
  }

  if (isLoading) {
    content = <Loading />
  }

  if (!isLoading && allPark.length > 0 && parkRemaining.length > 0) {
    const allParkRemaining = parkRemaining.map((item) => {
      const all = allPark.find((i) => i.id === item.id)
      return {
        ...item,
        ...all
      }
    })
    content = <AllMarker allParkRemaining={allParkRemaining}></AllMarker>
  }

  return (
    <MapContainer center={[25.0504753, 121.545543]} zoom={14} scrollWheelZoom={false}>
      <Button />

      <TileLayer attribution={osm.maptile.attribution} url={osm.maptile.url} />
      {content}
      <LocationMarker>
        <Popup>You are here</Popup>
      </LocationMarker>
    </MapContainer>
  )
}
