import navigate from '../assets/images/navigate.svg'

export default function PopupContent(props) {
  return (
    <div className='popup'>
      <div className='popup_title'>{props.item.name}</div>
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
      <PopupBody item={props.item}>{{ title: '費率', text: props.item.payex }}</PopupBody>
      <PopupBody item={props.item}>
        {{ title: '營業時間', text: props.item.serviceTime }}
      </PopupBody>
      <PopupBody item={props.item}>
        {{ title: '地址', text: props.item.address }}
      </PopupBody>

      <div className='popup_detail_group'>
        <PopupBody item={props.item}>{{ title: '電話', text: props.item.tel }}</PopupBody>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${props.item.name}`}
          className='popup_detail_group_btn'
        >
          <span className='popup_detail_group_btn_text'>Google 導航</span>
          <img src={navigate} className='popup_detail_group_btn_img' />
        </a>
      </div>
    </div>
  )
}

function PopupBody({ children }) {
  return (
    <div className='popup_detail_box'>
      <h4 className='popup_detail_box_title'>{children.title}</h4>
      <span className='popup_detail_box_body'>{children.text}</span>
    </div>
  )
}
