// import iconBlue from '../assets/images/pinBlue.svg'
import iconYellow from '../assets/images/pinYellow.svg'

export default function QuickNav() {
  return (
    <div className='quick-container'>
      <div className='quick-container_title'>快速導引</div>
      <p className='quick-container_subtitle'>300 公尺以內的所有停車場</p>
      <div className='quick-container_card'>
        <div className="quick-container_card_box">
          <img src={iconYellow} alt='iconBlue' className='quick-container_card_box_img' />
          <div className='quick-container_card_box_detail'>
            <h3 className='quick-container_card_box_detail_title'>
              這裡是很長很長很長很長很長很長很長的停車場名字
            </h3>
            <p className='quick-container_card_box_detail_body'>
              這裡是很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長的停車場地址
            </p>
          </div>
        </div>
        <div className='quick-container_card_distance'>500m</div>
      </div>
    </div>
  )
}
