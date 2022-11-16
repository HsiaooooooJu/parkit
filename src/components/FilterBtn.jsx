import filter from '../assets/images/drop-down.svg'

export default function FilterBtn({ handleFilter, isLoading, isClicked }) {
  return isLoading ? (
    <button disabled className='filter-container_filter'>
      <span className='filter-container_filter_title'>篩選</span>
      <img src={filter} className='filter-container_filter_img' />
    </button>
  ) : (
    <>
      <button
        className={isClicked ? 'filter-container filter-expand_btn' : 'filter-container'}
        onClick={handleFilter}
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
            <h4 className='filter-list_box_title'>剩餘數量</h4>
            <div className='filter-list_box_group'>
              <label htmlFor='many' className='filter-list_box_group_label'>
                停車場剩餘車位大於 20 個
                <input id='many' type='radio' name='filter-remain' />
              </label>
              <label htmlFor='some' className='filter-list_box_group_label'>
                停車場剩餘車位 0 - 10 個
                <input id='some' type='radio' name='filter-remain' />
              </label>
              <label htmlFor='all' className='filter-list_box_group_label'>
                顯示全部停車場
                <input id='all' type='radio' name='filter-remain' />
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
