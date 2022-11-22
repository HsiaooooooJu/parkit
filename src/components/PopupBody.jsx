export default function PopupBody({ children }) {
  const { title, text } = children
  return (
    <div className='popup_detail_box'>
      <h4 className='popup_detail_box_title'>{title}</h4>
      <span className='popup_detail_box_body'>{text}</span>
    </div>
  )
}
