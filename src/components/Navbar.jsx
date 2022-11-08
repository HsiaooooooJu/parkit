import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import '../assets/styles/Navbar.scss'
import logo from '../assets/images/logo-1.svg'
import hamburger from '../assets/images/navbar.svg'
import close from '../assets/images/close.svg'

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggle = () => setIsExpanded(!isExpanded)
  const blur = () => setIsExpanded(false)

  return (
    <nav className='nav'>
      <div className='nav-container'>
        <Link to='/' className='nav-container_logo'>
          <img src={logo} alt='logo' />
        </Link>
        <button className='nav-container_hamburger' onClick={toggle}>
          {isExpanded ? (
            <img src={close} alt='close' />
          ) : (
            <img src={hamburger} alt='hamburger' />
          )}
        </button>
        <div className={isExpanded ? 'nav-container_backdrop expanded' : ''} onClick={blur}>
          <div
            className={isExpanded ? 'nav-container_list expanded' : 'nav-container_list'}
          >
            <CustomLink to='/about-us' onClick={toggle}>
              關於我們
            </CustomLink>
            <CustomLink to='/quick-nav' onClick={toggle}>
              使用說明
            </CustomLink>
            <CustomLink to='/parking' onClick={toggle}>
              停車地圖
            </CustomLink>
            <CustomLink to='/setting' onClick={toggle}>
              地圖樣式
            </CustomLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

function CustomLink({ to, onClick, children }) {
  return (
    <div className='nav-container_item'>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          isActive ? 'active nav-container_title' : 'nav-container_title'
        }
      >
        {children}
      </NavLink>
    </div>
  )
}
