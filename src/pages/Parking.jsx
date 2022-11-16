import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { converter } from '../utils/Converter'
import osm from '../utils/OsmProvider'
import { fetchAllPark, fetchAllRemain } from '../apis/ParkingAPI'

import LocationMarker from '../components/LocationMarker'
import Loading from '../components/Loading'
import AllMarker from '../components/AllMarker'
import FilterBtn from '../components/FilterBtn'

const { BaseLayer } = LayersControl

export default function Parking() {
  const center = { lat: 25.0504753, lng: 121.545543 }
  const [currentPosition, setCurrentPosition] = useState(center)
  const [isLoading, setIsLoading] = useState(true)

  const [allPark, setResPark] = useState([])
  const [isClicked, setIsClicked] = useState(false)
  const handleFilter = () => {
    setIsClicked(!isClicked)
  }
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    const timer = window.setTimeout(() => {
      Promise.all([fetchAllPark(), fetchAllRemain()])
        .then(([dataPark, dataRemain]) => {
          const parks = dataPark.data.park.map((item) => {
            const latlng = converter(item.tw97x, item.tw97y)
            const spaces = dataRemain.data.park.find((i) => i.id === item.id)
            return {
              id: item.id,
              name: item.name,
              address: item.address.length ? item.address : '無資料',
              tel: item.tel ? item.tel : '無資料',
              payex: item.payex ? item.payex : '無資料',
              latlng,
              serviceTime: item.serviceTime ? item.serviceTime : '無資料',
              totalCar: item.totalcar,
              availableCar: spaces ? spaces.availablecar : '無資料'
            }
          })
          setResPark(parks)
        })
        .catch((error) => {
          alert('網路連線不穩定，請稍後再試')
          console.log(error)
          return navigate('/')
        })
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // get current location from LocationMarker using callback function
  let passData = (data) => {
    setCurrentPosition(data)
  }

  // content depends on different state
  let content

  if (isLoading && allPark.length === 0) {
    return (content = <Loading />)
  }

  if (!isLoading && allPark.length > 0) {
    content = (
      <AllMarker
        allPark={allPark}
        currentPosition={currentPosition}
        isClicked={isClicked}
      />
    )
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={16}
      minZoom={14}
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

      <FilterBtn
        isClicked={isClicked}
        handleFilter={handleFilter}
        isLoading={isLoading}
      />

      {/* all the parking lots pin */}
      {content}

      <LocationMarker
        center={center}
        passData={passData}
        fetchAllRemain={fetchAllRemain}
      />
    </MapContainer>
  )
}
