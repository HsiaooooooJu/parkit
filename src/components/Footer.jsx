import logo from '../assets/images/logo-2.svg'

export default function Footer() {
  return (
    <div className='footer-container'>
      <img src={logo} className='footer-container_logo' />
      <div className='footer-container_block'>
        <div className='footer-container_block_title'>停車</div>
        <div className='footer-container_block_text'>快速導引</div>
        <div className='footer-container_block_text'>地圖</div>
      </div>
      <div className='footer-container_block'>
        <div className='footer-container_block_title'>設定</div>
        <div className='footer-container_block_text'>地圖樣式</div>
        <div className='footer-container_block_text'>關於我們</div>
      </div>
    </div>
  )
}
