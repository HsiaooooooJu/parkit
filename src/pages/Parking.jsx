import { stall } from '../components/Icons'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import osm from '../utils/OsmProvider'
import parkData from '../data/park.json'
import handleData from '../utils/HandleData'

import PopupContent from '../components/PopupContent'
import LocationMarker from '../components/LocationMarker'

import Button from '../components/Button'


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
        <Button />

        <TileLayer attribution={osm.maptile.attribution} url={osm.maptile.url} />

        <GetMapCenter />

        {parkInfo.map((park) => (
          <Marker key={park.id} position={park.position} icon={stall}>
            <Popup>
              <div className='popup-container'>
                <div className='popup-container_title'>{park.name}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* <Marker position={position}></Marker> */}
        <LocationMarker>
          <Popup>You are here</Popup>
        </LocationMarker>
      </MapContainer>
    </div>
  )
}

// function GetMapCenter() {
//   const map = useMap()
//   // 得到兩點的距離
//   // const dist = map.distance([25.0504753, 121.545543], [25.04754574, 121.5716298])
//   console.log()
//   console.log('map center:', map.getCenter())
//   return null
// }

// import { getParkingLots } from '../apis/ParkingAPI'
// import { useState, useEffect } from 'react'

// async function parkingLots() {
//   try {
//     const { data } = await getParkingLots()
//     console.log(data)
//   } catch (error) {
//     alert('無法取得資料，請稍後再試')
//   }
// }

// export function ParkingLotsData() {
//   const [parkingLots, setParkingLots] = useState(null)
//   useEffect(() => {
//     async function startFetching() => {
//       const response = await getParkingLots()
//       setParkingLots(response)
//     }
//   }, [])
// }

// export function ParkingLotsData() {
//   const [parkingLots, setParkingLots] = useState(null)

//   async function fetchData() {
//     const response = await getParkingLots()
//     setParkingLots(response.data)
//     console.log(response.data)
//   }

//   useEffect(() => {
//     fetchData()
//   })
// }
