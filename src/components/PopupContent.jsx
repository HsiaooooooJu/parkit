export default function PopupContent(props) {
  return (
    <div className='popup'>
      <a href={`https://www.google.com/maps/dir/?api=1&destination=${props.item.name}`} className='popup_title'>
        {props.item.name}
      </a>     <div className='popup_sub'>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>空位</span>
          <span className='popup_sub_box_num'>{props.item.availableCar}</span>
        </div>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>總車位</span>
          <span className='popup_sub_box_num'>{props.item.totalCar}</span>
        </div>
      </div>
      <div className='popup_detail_box'>
        <h4 className='popup_detail_box_title'>費率</h4>
        <span className='popup_detail_box_body'>{props.item.payex}</span>
      </div>
      <div className='popup_detail_box'>
        <h4 className='popup_detail_box_title'>營業時間</h4>
        <span className='popup_detail_box_body'>{props.item.serviceTime}</span>
      </div>
      <div className='popup_detail_box'>
        <h4 className='popup_detail_box_title'>地址</h4>
        <span className='popup_detail_box_body'>{props.item.address}</span>
      </div>
      <div className='popup_detail_box'>
        <h4 className='popup_detail_box_title'>電話</h4>
        <span className='popup_detail_box_body'>{props.item.tel}</span>
      </div>
    </div>
  )
}
