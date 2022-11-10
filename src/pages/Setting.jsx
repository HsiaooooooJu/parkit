import defaultMap from '../assets/images/Default.png'
import tradition from '../assets/images/Tradition.png'

export default function Setting() {
  return (
    <div className='setting-container'>
      <div className='setting-container_title'>地圖樣式</div>
      <p className='setting-container_text'>Parkit 提供了兩種地圖樣式：</p>
      <div className='setting-container_style'>
        <div className='setting-container_style_box'>
           <img src={defaultMap} alt='default' className='setting-container_style_box_img' />
        </div>
        <div className='setting-container_style_box'>
          <img src={tradition} alt='tradition' className='setting-container_style_box_img' />
        </div>
      </div>
      
    </div>
  )
}
