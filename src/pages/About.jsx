export default function About() {
  return (
    <div className='about_container'>
      <div className='about_container_title'>關於我們</div>
      <p className='about_container_content'>
        Parkit 不僅是 <strong>Park it</strong> 還是 <strong>Park it</strong>
        ，希望能藉由這個 Web App 方便使用者找到停車位。
        <br />
        祝使用愉快，永遠有空位可以停 ：）
      </p>
      <div className='about_container_title'>聯絡我們</div>
      <div className='about_container_wrapper'>
        <div className='about_container_box'>
          <div className='about_container_box_title'>電話</div>
          <div className='about_container_box_title'>Email</div>
        </div>
        <div className='about_container_box'>
          <div className='about_container_box_text'>02-0000-0000</div>
          <div className='about_container_box_text'>parkit@company.com</div>
        </div>
      </div>
    </div>
  )
}
