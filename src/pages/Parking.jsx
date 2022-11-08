import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { converter } from '../utils/Converter'
import osm from '../utils/OsmProvider'

import LocationMarker from '../components/LocationMarker'
import Loading from '../components/Loading'
import AllMarker from '../components/AllMarker'

const { BaseLayer } = LayersControl

export default function Parking() {
  const center = { lat: 25.0504753, lng: 121.545543 }
  const [currentPosition, setCurrentPosition] = useState(center)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [allPark, setResPark] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    Promise.all([
      fetch('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json'),
      fetch('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json')
    ])
      .then(([resPark, resRemain]) => Promise.all([resPark.json(), resRemain.json()]))
      .then(([dataPark, dataRemain]) => {
        const parks = dataPark.data.park.map((item) => {
          const latlng = converter(item.tw97x, item.tw97y)
          const spaces = dataRemain.data.park.find((i) => i.id === item.id)
          return {
            id: item.id,
            name: item.name,
            address: item.address,
            tel: item.tel,
            payex: item.payex,
            latlng,
            serviceTime: item.serviceTime,
            totalCar: item.totalcar,
            fareWorkday: item.FareInfo.WorkingDay,
            fareHoliday: item.FareInfo.Holiday,
            availableCar: spaces ? spaces.availablecar : 0
          }
        })
        setResPark(parks)
      })
      .catch((error) => {
        alert('無法取得停車場資料，請稍後再試')
        setError(error)
      })
    setIsLoading(false)
  }, [])

  // get current location from child component using callback function
  let passData

  // content depends on different state
  let content

  if (error) {
    alert('無法取得停車場資料，請稍後再試')
    return navigate('/')
  }

  if (isLoading) {
    return (content = <Loading />)
  }

  if (!isLoading) {
    passData = (data) => {
      setCurrentPosition(data)
    }
    content = <AllMarker allPark={allPark} currentPosition={currentPosition}></AllMarker>
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={16}
      minZoom={15}
      scrollWheelZoom={false}
    >
      <LayersControl position='bottomright'>
        <BaseLayer checked name='Default'>
          <TileLayer attribution={osm.default.attribution} url={osm.default.url} />
        </BaseLayer>

        <BaseLayer name='Tradition'>
          <TileLayer attribution={osm.tradition.attribution} url={osm.tradition.url} />
        </BaseLayer>
      </LayersControl>
      {/* all the parking lots pin */}
      {content}
      <LocationMarker center={center} passData={passData} />
    </MapContainer>
  )
}
