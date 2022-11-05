import { Link } from 'react-router-dom'

export default function PopupContent({ ...props }) {
  // get all fare in different period
  const allWorkdayFare = props.item.fareWorkday.map((item) => {
    return item.Fare
  })
  const allHolidayFare = props.item.fareHoliday.map((item) => {
    return item.Fare
  })

  // concat to merge 2 array
  // Math.max(...array) to get the max num in an array
  const maxFare = Math.max(...allWorkdayFare.concat(allHolidayFare))

  return (
    <div className='popup'>
      <Link to='/detail' className='popup_title'>
        {props.item.name}
      </Link>
      <div className='popup_sub'>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>空位</span>
          <span className='popup_sub_box_num'>{props.item.availableCar}</span>
        </div>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>總車位</span>
          <span className='popup_sub_box_num'>{props.item.totalCar}</span>
        </div>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_price'>$ {maxFare}/h</span>
        </div>
      </div>
    </div>
  )
}
