import { Link } from 'react-router-dom'

export default function PopupContent(props) {
  return (
    <div className='popup'>
      <Link to='/detail' className='popup_title'>
        {props.name}
      </Link>
      <div className='popup_sub'>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>空位</span>
          <span className='popup_sub_box_num'>8888</span>
        </div>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>總車位</span>
          <span className='popup_sub_box_num'>5000</span>
        </div>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_price'>$ 50/h</span>
        </div>        
      </div>
    </div>
  )
}

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
