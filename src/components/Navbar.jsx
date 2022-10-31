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
          <NavLink className='nav-container_item' to='/setting'>
            <div className='nav-container_title'>系統設定</div>
          </NavLink>
          <NavLink className='nav-container_item' to='/parking'>
            <div className='nav-container_title'>停車地圖</div>
          </NavLink>
          <NavLink className='nav-container_item' to='/about-us'>
            <div className='nav-container_title'>關於我們</div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}