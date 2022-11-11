import showAll from '../assets/images/show-all.svg'

export default function ShowAllBtn({ handleShowAll, isLoading }) {

  return isLoading ? (
    <button disabled className='map-container_show-all'>
      <img src={showAll} />
    </button>
  ) : (
    <button className='map-container_show-all' onClick={handleShowAll}>
      <img src={showAll} />
    </button>
  )
}
