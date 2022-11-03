import { Link } from 'react-router-dom'
// import parkData from '../data/park.json'

export default function PopupContent() {
  return (
    <div className='popup'>
      <Link to='/quick-nav' className='popup_title'>
        臺北市文山區明道國民小學停車場
      </Link>
      <div className='popup_sub'>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>空位</span>
          <span className='popup_sub_box_num'>3880</span>
        </div>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>總車位</span>
          <span className='popup_sub_box_num'>5000</span>
        </div>
      </div>
    </div>
  )
}

// const park = parkData.data.park

// function getFare() {
//   // 取得最高的費用
//   const fareWorkingDay = park.map((p) => {
//     return p.FareInfo.WorkingDay
//   })
//   console.log('fareWorkingDay', fareWorkingDay)

//   // const info = park[0].FareInfo.WorkingDay[0].Fare

//   const fare = park[0].FareInfo.WorkingDay.map( item => {
//     return item.Fare
//   })
//   const maxFare = Math.max(...fare)
//   console.log('maxFare', maxFare)
// }
