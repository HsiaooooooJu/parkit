import { useContext } from 'react'
import { ParkingContext } from '../context/ParkingContext'
import Loading from '../components/Loading'
import FavParkCard from '../components/FavParkCard'

export default function FavPark() {
  const { likes, isLoading } = useContext(ParkingContext)

  let content

  if (likes.length === 0) {
    content = <p style={{ color: 'var(--dark-60)' }}>尚未新增停車場到最愛清單</p>
  } else {
    content = likes.map((item) => {
      return <FavParkCard key={item.id} item={item} />
    })
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className='fav-container'>
      <div className='fav-container_title'>我的最愛</div>
      {content}
    </div>
  )
}
