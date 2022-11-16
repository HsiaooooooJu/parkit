import blueStall from '../assets/images/blue-stall.svg'
import greenStall from '../assets/images/green-stall.svg'
import redStall from '../assets/images/red-stall.svg'
import grayStall from '../assets/images/gray-stall.svg'
import locationBtn from '../assets/images/location.svg'
import showAll from '../assets/images/show-all.svg'

export default function QuickStart() {
  return (
    <div className='quick-container'>
      <div className='quick-container_title'>使用說明</div>
      <List src={greenStall}>剩餘車位大於 20 個</List>
      <List src={blueStall}>剩餘車位 0 - 10 個</List>
      <List src={redStall}>無剩餘車位</List>
      <List src={grayStall}>無資料</List>

      <div className='quick-container_card'>
        <img src={locationBtn} className='quick-container_card_round-img' />
        <div className='quick-container_card_text'>
          定位現在位置，並尋找直徑 550 公尺範圍內的所有停車場
        </div>
      </div>
      <div className='quick-container_card'>
        <img src={showAll} className='quick-container_card_round-img' />
        <div className='quick-container_card_text'>
          切換：顯示所有有空車位的停車場｜顯示現在位置附近的停車場
        </div>
      </div>
    </div>
  )
}

function List({ src, children }) {
  return (
    <div className='quick-container_card'>
      <img src={src} className='quick-container_card_img' />
      <div className='quick-container_card_text'>{children}</div>
    </div>
  )
}
