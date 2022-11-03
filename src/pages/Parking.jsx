import L from 'leaflet'
import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet'

import parkData from '../data/park.json'
import osm from '../utils/OsmProvider'
import handleData from '../utils/HandleData'

import PopupContent from '../components/PopupContent'
import LocationMarker from '../components/LocationMarker'

import parkStall from '../assets/images/park-stall.svg'
import locationIcon from '../assets/images/location.svg'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const stall = new L.Icon({
  iconUrl: parkStall,
  iconSize: [45, 50],
  shadowUrl: markerShadow,
  shadowAnchor: [13, 16],
  popupAnchor: [0, -24]
})

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

  return (
    <div id='map'>
      <MapContainer
        center={[25.0504753, 121.545543]}
        zoom={14}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <button className='map-container_locate'>
          <img src={locationIcon} />
        </button>
        <ZoomControl position='bottomleft' />
        <TileLayer attribution={osm.maptile.attribution} url={osm.maptile.url} />
        {parkInfo.map((park) => (
          <Marker key={park.id} position={park.position} icon={stall}>
            <Popup>
              <div className='popup-container'>
                <div className='popup-container_title'>{park.name}</div>
              </div>
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
