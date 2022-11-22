import navigate from '../assets/images/navigate.svg'
import like from '../assets/images/like.svg'
import greenPin from '../assets/images/green-pin.svg'
import bluePin from '../assets/images/blue-pin.svg'
import redPin from '../assets/images/red-pin.svg'
import grayPin from '../assets/images/gray-pin.svg'

import PopupBody from './PopupBody'
import { useContext } from 'react'
import { ParkingContext } from '../context/ParkingContext'

export default function FavParkCard({ item }) {
  const { removeLike } = useContext(ParkingContext)

  let icon

    if (item.availableCar <= 0) {
      icon = redPin
    } else if (item.availableCar > 10) {
      icon = greenPin
    } else if (item.availableCar < 10) {
      icon = bluePin
    } else if (item.availableCar === '無資料') {
      icon = grayPin
    }

  return (
    <div className="card">
      <img src={icon} className="card_icon" />
      <div className="card_wrapper">
        <h3 className='card_title'>{item.name}</h3>
        <div className="card_wrapper_top">
          <div className="card_content">
            <div className="card_content_box">
              <h4 className="card_content_box_title">空位</h4>
              <span className="card_content_box_body">{item.availableCar}</span>
            </div>
            <div className="card_content_box">
              <h4 className="card_content_box_title">總車位</h4>
              <span className="card_content_box_body">{item.totalCar}</span>
            </div>
          </div>
          <div className="card_btn-group">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${item.name}`}
              className='card_link'
            >
              <span className='card_link_text'>導航</span>
              <img src={navigate} className='card_link_img' />          
            </a>
            <button className='card_btn' onClick={() => {removeLike(item.id)}}>
              <img
                id={item.id}
                src={like}
                className='card_btn_like'
              />
            </button>
          </div>
        </div>
        <div className="card_wrapper_bottom">
          <div className='card_wrapper_bottom_cutoff-text'>
            <PopupBody item={item}>{{ title: '費率', text: item.payex }}</PopupBody>
            <PopupBody item={item}>{{ title: '營業時間', text: item.serviceTime }}</PopupBody>
            <PopupBody item={item}>{{ title: '地址', text: item.address }}</PopupBody>
            <PopupBody item={item}>{{ title: '電話', text: item.tel }}</PopupBody>
          </div>
          <input type='checkbox' className='card_wrapper_bottom_expand-btn' />
        </div>
      </div>
    </div>
  )
}