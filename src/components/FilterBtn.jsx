/*eslint-disable*/
import filter from '../assets/images/drop-down.svg'

export default function FilterBtn({ isLoading, isClicked, setIsClicked, isSelected, setIsSelected }) {

  // clicked filter btn
  const toggleIsClicked = () => {
    setIsClicked(!isClicked)
  }

  const filterVacancy = (e) => {
    console.log(e.target.value)
    setIsSelected({ remain: e.target.value })
  }

  const filterNearby = (e) => {
    console.log(e.target.value)
    setIsSelected({ nearby: e.target.value })
  }

  return isLoading ? (
    <button disabled className='filter-container_filter'>
      <span className='filter-container_filter_title'>篩選</span>
      <img src={filter} className='filter-container_filter_img' />
    </button>
  ) : (
    <>
      <div className="filter" onClick={() => {setIsClicked(false)}} />
      <button
        className={isClicked ? 'filter-container filter-expand_btn' : 'filter-container'}
        onClick={toggleIsClicked}
      >
        <span className='filter-container_title'>篩選</span>
        <img
          src={filter}
          className={
            isClicked ? 'filter-container_img filter-expand_img' : 'filter-container_img'
          }
        />
      </button>
      <div className={isClicked ? 'filter-list filter-expand_list' : 'filter-list'}>
        <form>
          <div className='filter-list_box'>
            <h4 className='filter-list_box_title'>附近停車場</h4>
            <div className='filter-list_box_group'>
              <Radio htmlFor='300m' id='300m' value='300m' onClick={filterNearby} isSelected={isSelected}>半徑距離 300 公尺的停車場</Radio>
              <Radio htmlFor='600m' id='600m' value='600m' onClick={filterNearby} isSelected={isSelected}>半徑距離 600 公尺的停車場</Radio>
            </div>
          </div>
          <div className='filter-list_box'>
            <h4 className='filter-list_box_title'>空位數量</h4>
            <div className='filter-list_box_group'>
              <Radio htmlFor='many' id='many' value='many' onClick={filterVacancy} isSelected={isSelected}>停車場空位大於 20 個</Radio>
              <Radio htmlFor='some' id='some' value='some' onClick={filterVacancy} isSelected={isSelected}>停車場空位 0 - 10 個</Radio>
              <Radio htmlFor='ignore' id='ignore' value='ignore' onClick={filterVacancy} isSelected={isSelected}>忽略無空位資料的停車場</Radio>
              <Radio htmlFor='all' id='all' value='all' onClick={filterVacancy} isSelected={isSelected}>顯示全部停車場空位資料</Radio>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}


function Radio(props) {
  const {htmlFor, id, value, onClick, children, isSelected} = props
  return (
    <>
      <label htmlFor={htmlFor} className={isSelected.remain === value ? 'filter-list_box_group_label selected' : 'filter-list_box_group_label'}>{children}</label>
      <input id={id} type='radio' value={value} onClick={onClick} />
    </>
  )
}