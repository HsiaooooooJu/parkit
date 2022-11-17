const option = {
  enableHighAccuracy: true
}

export async function fetchAllPark() {
  const response = await fetch(
    'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json'
  )
  if (!response.ok) {
    throw new Error('無法取得停車場資料，請稍後再試')
  }
  return await response.json()
}

export async function fetchAllRemain() {
  const response = await fetch(
    'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json'
  )
  if (!response.ok) {
    throw new Error('無法取得剩餘車位資料，請稍後再試')
  }
  return await response.json()
}

export function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, option)
  })
}
