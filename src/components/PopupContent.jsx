import navigate from '../assets/images/navigate.svg'
import like from '../assets/images/like.svg'
import PopupBody from './PopupBody'
import { useContext } from 'react'
import { ParkingContext } from '../context/ParkingContext'

export default function PopupContent(props) {
  const { item } = props
  const { id, name, availableCar, totalCar, payex, serviceTime, address, tel } = item

  const { addLike, removeLike, itemIsLike } = useContext(ParkingContext)
  const isLike = itemIsLike(id)

  function toggleLike() {
    if (isLike) {
      removeLike(id)
    } else {
      addLike({
        id,
        name,
        availableCar,
        totalCar,
        payex,
        serviceTime,
        address,
        tel
      })
    }
  }

  return (
    <div className='popup'>
      <div className='popup_title'>{name}</div>
      <div className='popup_sub'>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>空位</span>
          <span className='popup_sub_box_num'>{availableCar}</span>
        </div>
        <div className='popup_sub_box'>
          <span className='popup_sub_box_title'>總車位</span>
          <span className='popup_sub_box_num'>{totalCar}</span>
        </div>
      </div>
      <div className='popup_btn-box'>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${name}`}
          className='popup_btn-box_link'
        >
          <span className='popup_btn-box_text'>Google 導航</span>
          <img src={navigate} className='popup_btn-box_img' />
        </a>
        <button className='popup_btn-box_like' onClick={toggleLike}>
          <img
            src={like}
            className={
              isLike ? 'popup_btn-box_like_img' : 'popup_btn-box_like_img inactive'
            }
          />
        </button>
      </div>

      <div className='cutoff-text'>
        <PopupBody item={item}>{{ title: '費率', text: payex }}</PopupBody>
        <PopupBody item={item}>{{ title: '營業時間', text: serviceTime }}</PopupBody>
        <PopupBody item={item}>{{ title: '地址', text: address }}</PopupBody>
        <PopupBody item={item}>{{ title: '電話', text: tel }}</PopupBody>
      </div>
      <input type='checkbox' className='expand-btn' />
    </div>
  )
}
