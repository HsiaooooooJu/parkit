import { Link } from 'react-router-dom'

export default function PopupContent(props) {
  return (
    <div className='popup'>
      <Link to='/parking/:id' className='popup_title'>
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
      </div>
      <div className="popup_sub_box_title popup_sub_box_title_colored">費率</div>
      <div className="popup_payex">{props.item.payex}</div>
      <div className="popup_sub_box_title popup_sub_box_title_colored">營業時間</div>
      <div className="popup_payex">{props.item.serviceTime}</div>
      <div className="popup_sub_box_title popup_sub_box_title_colored">地址</div>
      <div className="popup_payex">{props.item.address}</div><div className="popup_sub_box_title popup_sub_box_title_colored">電話</div>
      <div className="popup_payex">{props.item.tel}</div>
    </div>
  )
}
