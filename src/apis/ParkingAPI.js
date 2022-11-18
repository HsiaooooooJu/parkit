const allParkAPI = 'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json'
const allRemainAPI =
  'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json'

const option = {
  enableHighAccuracy: true
}

export async function fetchAllPark() {
  const response = await fetch(allParkAPI)
  const { data } = await response.json()
  return data
}

export async function fetchAllRemain() {
  const response = await fetch(allRemainAPI)
  const { data } = await response.json()
  return data
}

export function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, option)
  })
}
