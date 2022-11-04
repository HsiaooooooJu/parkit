import stall from '../assets/images/park-stall.svg'

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
      <img className='loading_img' src={stall} alt='park-stall' />
    </div>
  )
}
