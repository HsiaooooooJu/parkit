import blueStall from '../assets/images/blue-stall.svg'
import greenStall from '../assets/images/green-stall.svg'
import redStall from '../assets/images/red-stall.svg'

export default function QuickStart() {
  return (
    <div className='quick-container'>
      <div className='quick-container_title'>使用說明</div>
      <div className='quick-container_card'>
        <img src={greenStall} className='quick-container_card_img' />
        <div className='quick-container_card_text'>剩餘車位多餘 20 個</div>
      </div>
      <div className='quick-container_card'>
        <img src={blueStall} className='quick-container_card_img' />
        <div className='quick-container_card_text'>剩餘車位 0 - 10 個</div>
      </div>
      <div className='quick-container_card'>
        <img src={redStall} className='quick-container_card_img' />
        <div className='quick-container_card_text'>無剩餘車位</div>
      </div>
    </div>
  )
}
