import { converter } from '../utils/Converter'
import parkData from '../data/park.json'

export default function handleData() {
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

  // 把陣列資料彙整，方便 map() <Marker />
  const parkInfo = parkId.map((value, index) => {
    return {
      id: value,
      position: [position[index].lat, position[index].lng],
      name: parkName[index]
    }
  })
  return parkInfo
}
