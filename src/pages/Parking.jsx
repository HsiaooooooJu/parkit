import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import { useState, useEffect } from 'react'

import osm from '../utils/OsmProvider'

import LocationMarker from '../components/LocationMarker'
import AllMarker from '../components/AllMarker'
import FilterBtn from '../components/FilterBtn'
import SearchBtn from '../components/SearchBtn'

const { BaseLayer } = LayersControl

export default function Parking() {
  const center = { lat: 25.0504753, lng: 121.545543 }
  const [currentPosition, setCurrentPosition] = useState(() => {
    return JSON.parse(localStorage.getItem('position')) || center
  })
  const [style, setStyle] = useState(() => {
    return JSON.parse(localStorage.getItem('mapStyle')) || 'Default'
  })

  // state for filterBtn
  const [isSelected, setIsSelected] = useState({ remain: 'many', nearby: '' })

  // get current location from LocationMarker using callback function
  let passData = (data) => {
    setCurrentPosition(data)
  }

  const whenReadyHandler = (event) => {
    const baseLayerChange = (e) => {
      setStyle(e.name)
    }
    const { target } = event
    target.on('baselayerchange', baseLayerChange)
  }

  useEffect(() => {
    localStorage.setItem('mapStyle', JSON.stringify(style))
  }, [style])

  let map

  if (style === 'Tradition') {
    map = (
      <>
        <BaseLayer name='Default'>
          <TileLayer attribution={osm.default.attribution} url={osm.default.url} />
        </BaseLayer>

        <BaseLayer checked name='Tradition'>
          <TileLayer attribution={osm.tradition.attribution} url={osm.tradition.url} />
        </BaseLayer>
      </>
    )
  } else {
    map = (
      <>
        <BaseLayer checked name='Default'>
          <TileLayer attribution={osm.default.attribution} url={osm.default.url} />
        </BaseLayer>

        <BaseLayer name='Tradition'>
          <TileLayer attribution={osm.tradition.attribution} url={osm.tradition.url} />
        </BaseLayer>
      </>
    )
  }

  return (
    <MapContainer
      center={[currentPosition.lat, currentPosition.lng]}
      zoom={15}
      minZoom={13}
      scrollWheelZoom={false}
      whenReady={whenReadyHandler}
    >
      <LayersControl position='bottomright' change={whenReadyHandler}>
        {map}
      </LayersControl>

      <FilterBtn isSelected={isSelected} setIsSelected={setIsSelected} />

      <AllMarker currentPosition={currentPosition} isSelected={isSelected} />

      <SearchBtn setCurrentPosition={setCurrentPosition} position='bottomright' />

      <LocationMarker center={center} passData={passData} />
    </MapContainer>
  )
}
