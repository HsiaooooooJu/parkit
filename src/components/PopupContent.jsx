import { Link } from 'react-router-dom'
// import parkData from '../data/park.json'

export default function PopupContent() {
  // const park = parkData.data.park

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
