import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import L from 'leaflet'
import searchPin from '../assets/images/pin-search.svg'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

export default function SearchBtn({ setCurrentPosition }) {
  const mapTile = useMap()
  const icon = new L.Icon({
    iconUrl: searchPin,
    iconSize: [40, 40],
    shadowUrl: markerShadow,
    shadowAnchor: [13, 18],
    popupAnchor: [0, -20]
  })
  const provider = new OpenStreetMapProvider({
    params: {
      'accept-language': 'zh',
      countrycodes: 'tw'
    }
  })
  const searchControl = new GeoSearchControl({
    provider,
    showPopup: false,
    maxMarkers: 1,
    zoom: 18,
    style: 'bar',
    searchLabel: '請輸入地址',
    notFoundMessage: '找不到結果',
    autoComplete: true,
    autoCompleteDelay: 150,
    marker: { icon }
  })

  function searchEventHandler(result) {
    setCurrentPosition({ lat: result.location.y, lng: result.location.x })
  }
  mapTile.on('geosearch/showlocation', searchEventHandler)

  useEffect(() => {
    if (!mapTile) return
    mapTile.addControl(searchControl)
    return () => {
      mapTile.removeControl(searchControl)
    }
  }, [])
}
