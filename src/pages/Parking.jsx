import '../assets/styles/Parking.scss'
// import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import parkData from '../data/park.json'

export default function Parking() {
  const parkId = parkData.data.park.map((p) => {
    return p.id
  })

  const showCoord = parkData.data.park.map((p) => {
    return p.EntranceCoord.EntrancecoordInfo
  })
  const coordInfo = showCoord.flat()

  const code = coordInfo.map((value) => {
    if (!value) return
    return [value.Xcod, value.Ycod]
  })

  const parkInfo = { parkId, ...code, code }

  console.log(parkInfo.parkId) // ['001', '002', ..., '015']
  console.log(parkInfo.code[0]) // ['25', '121']

  // const parkInfo = [
  //   {
  //     001: ['25.03648987']
  //   }
  // ]

  console.log(parkInfo)

  return (
    <div id='map'>
      <MapContainer center={[25.029537, 121.49954]} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/* {parkInfo.map((park) => (<Marker key={parkInfo.parkId} position={parkInfo.code} />))} */}
      </MapContainer>
    </div>
  )
}

// let arr1 = [
//   { id: 'abdc4051', date: '2017-01-24' },
//   { id: 'abdc4052', date: '2017-01-22' }
// ]

// let arr2 = [
//   { id: 'abdc4051', name: 'ab' },
//   { id: 'abdc4052', name: 'abc' }
// ]

// let arr3 = arr1.map((item, i) => Object.assign({}, item, arr2[i]))

// console.log(arr3)
