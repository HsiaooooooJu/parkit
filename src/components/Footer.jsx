import logo from '../assets/images/logo-2.svg'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <Link to='/' className='footer-container_logo'>
          <img src={logo} />
        </Link>

        <div className="footer-container_wrap">
          <div className='footer-container_block'>
            <ul className='footer-container_block_title'>停車</ul>
            <FooterLink to='/quick-nav' className='footer-container_block_text'>
              快速導引
            </FooterLink>
            <FooterLink to='/parking' className='footer-container_block_text'>
              停車地圖
            </FooterLink>
          </div>
          <div className='footer-container_block'>
            <ul className='footer-container_block_title'>設定</ul>
            <FooterLink to='/map-style' className='footer-container_block_text'>
              地圖樣式
            </FooterLink>
            <FooterLink to='/about-us' className='footer-container_block_text'>
              關於我們
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
