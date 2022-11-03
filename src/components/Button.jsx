import locationIcon from '../assets/images/location.svg'

export default function Button() {
  return (
    <button className='map-container_locate'>
      <img src={locationIcon} />
    </button>
  )
}

// function getLocation() {
//   navigator.geolocation.getCurrentPosition(showPosition, showError)
// }

// // success callBack
// function showPosition(position) {
//   const lat = position.coords.latitude
//   const lng = position.coords.longitude
//   console.log(lat, lng)
//   return [lat, lng]
// }

// // error callBack
// function showError() {
//   alert('無法取得當前位置')
// }

// const position = getLocation()

