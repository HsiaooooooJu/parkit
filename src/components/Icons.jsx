// current loacation
import orangePin from '../assets/images/pin-orange.svg'
import redPins from '../assets/images/red-pin.svg'
import grayPins from '../assets/images/gray-pin.svg'
import greenPins from '../assets/images/green-pin.svg'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import L from 'leaflet'

export const locate = new L.Icon({
  iconUrl: orangePin,
  iconSize: [40, 40],
  shadowUrl: markerShadow,
  shadowAnchor: [13, 18],
  popupAnchor: [0, -20]
})

export const greenPin = new L.Icon({
  iconUrl: greenPins,
  iconSize: [45, 50],
  shadowUrl: markerShadow,
  shadowAnchor: [13, 16],
  popupAnchor: [0, -24]
})

export const redPin = new L.Icon({
  iconUrl: redPins,
  iconSize: [45, 50],
  shadowUrl: markerShadow,
  shadowAnchor: [13, 16],
  popupAnchor: [0, -24]
})

export const grayPin = new L.Icon({
  iconUrl: grayPins,
  iconSize: [45, 50],
  shadowUrl: markerShadow,
  shadowAnchor: [13, 16],
  popupAnchor: [0, -24]
})
