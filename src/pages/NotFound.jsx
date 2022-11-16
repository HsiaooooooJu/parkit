import { Link } from 'react-router-dom'
import cloudL from '../assets/images/cloud-l.svg'
import cloudS from '../assets/images/cloud-s.svg'
import arrow from '../assets/images/arrow.svg'
import car from '../assets/images/car.svg'

export default function NotFound() {
  return (
    <div className='not-found-container'>
      <div className='not-found'>
        <img src={cloudL} className='not-found_cloud_large' />
        <img src={cloudS} className='not-found_cloud_small' />
        <h4 className='not-found_title'>404 Not Found</h4>
        <img src={car} className='not-found_car' />
        <div className='not-found_block'>
          <Link to='/'>
            <img src={arrow} className='not-found_block_arrow' />
            <span className="not-found_block_text">BACK</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
