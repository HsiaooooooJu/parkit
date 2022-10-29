import main from '../assets/images/main.svg'
import '../assets/styles/Home.scss'

export default function Home() {
  return (
    <div className='home-container'>
      <img src={main} className='home-container_main-img' alt='main' />
    </div>
  )
}
