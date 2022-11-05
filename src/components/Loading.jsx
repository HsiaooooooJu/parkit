import greenPin from '../assets/images/green-pin.svg'

export default function Loading() {
  return (
    <div className='loading'>
      <p className='loading_text'>
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
      </p>
      <div className='loading_rec'></div>
      <img className='loading_img' src={greenPin} alt='greenPin' />
    </div>
  )
}
