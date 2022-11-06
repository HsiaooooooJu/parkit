// import { Marker, useMapEvents } from 'react-leaflet'
// import { useState } from 'react'

// import { locate } from '../components/Icons'

// export default function LocationMarker({ children }) {
//   const [position, setPosition] = useState(null)
//   const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     }
//   })

//   console.log('found in map = =')

//   return position === null ? null : (
//     <Marker position={position} icon={locate}>
//       {children}
//     </Marker>
//   )
// }


// function GetDistance() {
//   const map = useMap()
//   // 得到兩點的距離
//   // const dist = map.distance([25.0504753, 121.545543], [25.04754574, 121.5716298])
//   console.log(dist)
//   return dist
// }
