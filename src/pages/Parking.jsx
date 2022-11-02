import '../assets/styles/Parking.scss'
import '../assets/styles/Leaflet.scss'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { DivIcon } from 'leaflet'
import { converter } from '../utils/Converter'
import parkData from '../data/park.json'
import PopupContent from '../components/PopupContent'
import LocationMarker from '../components/LocationMarker'

import bluePin from '../assets/images/pin-blue.svg'

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
      <MapContainer center={[25.0504753, 121.545543]} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          attribution='<a href="https://stadiamaps.com/">&copy; Stadia Maps</a><a href="https://openmaptiles.org/">&copy; OpenMapTiles</a><a href="http://openstreetmap.org">&copy; OpenStreetMap</a>'
          url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
        />
        {parkInfo.map((park) => (
          <Marker key={park.id} position={park.code}>
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

function handleData() {
  const park = parkData.data.park

  const parkId = park.map((p) => {
    return p.id
  })

  // 轉換成 lat lng 座標
  const position = park.map((p) => {
    const code = converter(p.tw97x, p.tw97y)
    return code
  })
  const parkName = parkData.data.park.map((p) => {
    return p.name
  })

  // 把兩筆陣列資料彙整方便 map <Marker />
  const parkInfo = parkId.map((value, index) => {
    return {
      id: value,
      position: [position[index].lat, position[index].lng],
      name: parkName[index]
    }
  })
  return parkInfo
}
