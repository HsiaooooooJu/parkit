import orangePin from '../assets/images/pin-orange.svg'
import L from 'leaflet'

import parkStall from '../assets/images/park-stall.svg'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

export const stall = new L.Icon({
  iconUrl: parkStall,
  iconSize: [45, 50],
  shadowUrl: markerShadow,
  shadowAnchor: [13, 16],
  popupAnchor: [0, -24]
})

export const orange = new L.Icon({
  iconUrl: orangePin,
  iconSize: [40, 40],
  shadowUrl: markerShadow,
  shadowAnchor: [13, 16],
  popupAnchor: [0, -20]
})
