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
        const parks = dataPark.data.park.slice(50, 60).map((item) => {
          const latlng = converter(item.tw97x, item.tw97y)
          const spaces = dataRemain.data.park.find((i) => i.id === item.id)
          return {
            id: item.id,
            name: item.name,
            address: item.address,
            tel: item.tel,
            latlng,
            serviceTime: item.serviceTime,
            totalCar: item.totalcar,
            fareWorkingDay: item.FareInfo.WorkingDay,
            fareHoliday: item.FareInfo.Holiday,
            availablecar: spaces ? spaces.availablecar : 0
          }
        })
        setResPark(parks)
      })
    setIsLoading(false)
  }, [])

  console.log('resPark', allPark)

  // get current location from child component using callback function
  let passData

  // content depends on different state
  let content

  if (error) {
    alert(error)
    return navigate('/')
  }

  if (isLoading) {
    content = <Loading />
  }

  if (!isLoading && allPark.length > 0) {
    passData = (data) => {
      setCurrentPosition(data)
    }
    content = <AllMarker allPark={allPark} currentPosition={currentPosition}></AllMarker>
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={17}
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
