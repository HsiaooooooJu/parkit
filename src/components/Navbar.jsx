import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import '../assets/styles/Navbar.scss'
import logo from '../assets/images/logo-1.svg'
import hamburger from '../assets/images/navbar.svg'
import close from '../assets/images/close.svg'

export default function TopNav() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className='nav'>
      <div className='nav-container'>
        <Link to='/' className='nav-container_logo'>
          <img src={logo} alt='logo' />
        </Link>
        <button
          className='nav-container_hamburger'
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? (
            <img src={close} alt='close' />
          ) : (
            <img src={hamburger} alt='hamburger' />
          )}
        </button>
        <div
          className={isExpanded ? 'nav-container_list expanded' : 'nav-container_list'}
        >
          <CustomLink to='/about-us'>關於我們</CustomLink>
          <CustomLink to='/parking'>停車地圖</CustomLink>
          <CustomLink to='/setting'>地圖樣式</CustomLink>
        </div>
      </div>
    </nav>
  )
}

function CustomLink({ to, children }) {
  return (
    <NavLink className='nav-container_item' to={to}>
      <div
        className={({ isActive }) =>
          isActive ? 'active nav-container_title' : 'nav-container_title'
        }
      >
        {children}
      </div>
    </NavLink>
  )
}
