import retro from '../assets/images/retro.png'
import silver from '../assets/images/silver.png'

export default function Setting() {
  return (
    <div className='setting-container'>
      <div className='setting-container_title'>地圖樣式</div>
      <p className='setting-container_text'>請選擇您想使用的樣式 ：</p>
      <div className='setting-container_style'>
        <div className='setting-container_style_box'>
          <label htmlFor='silver' className='setting-container_style_box_label' />
          <img src={retro} alt='retro' className='setting-container_style_box_img' />
          <input
            type='radio'
            name='map-style'
            id='silver'
            className='setting-container_style_box_input'
          />
        </div>
        <div className='setting-container_style_box'>
          <label htmlFor='retro' className='setting-container_style_box_label' />
          <img src={silver} alt='silver' className='setting-container_style_box_img' />
          <input
            type='radio'
            name='map-style'
            id='retro'
            className='setting-container_style_box_input'
          />
        </div>
      </div>
    </div>
  )
}
