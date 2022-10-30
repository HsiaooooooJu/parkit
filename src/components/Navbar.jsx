import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import '../assets/styles/Navbar.scss'
import logo from '../assets/images/logo-1.svg'
import park from '../assets/images/park.svg'
import setting from '../assets/images/setting.svg'
import hamburger from '../assets/images/navbar.svg'
import close from '../assets/images/close.svg'
import more from '../assets/images/more.svg'
import less from '../assets/images/less.svg'

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
          <DropDown />
        </div>
      </div>
    </nav>
  )
}

export function DropDown() {
  const [subNavExpanded, setSubNavExpanded] = useState(false)
  return (
    <>
      {/* drop down btn */}
      <button
        className='nav-container_item'
        onClick={() => setSubNavExpanded(!subNavExpanded)}
      >
        <img src={park} className='nav-container_item_img' />
        <div className='nav-container_title'>停車</div>
        {subNavExpanded ? (
          <img src={less} className='nav-container_item_less' />
        ) : (
          <img src={more} className='nav-container_item_more' />
        )}
      </button>
      {/* drop down content */}
      <div className={subNavExpanded ? 'sub-nav expanded' : 'sub-nav'}>
        <NavLink className='sub-nav_item' to='/quick-nav'>
          快速導引
        </NavLink>
        <NavLink className='sub-nav_item' to='/parking'>
          停車地圖
        </NavLink>
      </div>

      {/* drop down btn */}
      <button
        className='nav-container_item'
        onClick={() => setSubNavExpanded(!subNavExpanded)}
      >
        <img src={setting} className='nav-container_item_img' />
        <div className='nav-container_title'>設定</div>
        {subNavExpanded ? (
          <img src={less} className='nav-container_item_less' />
        ) : (
          <img src={more} className='nav-container_item_more' />
        )}
      </button>
      {/* drop down content */}
      <div className={subNavExpanded ? 'sub-nav expanded' : 'sub-nav'}>
        <NavLink className='sub-nav_item' to='/account'>
          帳號
        </NavLink>
        <NavLink className='sub-nav_item' to='/map-style'>
          地圖樣式
        </NavLink>
        <NavLink className='sub-nav_item' to='/about-us'>
          關於我們
        </NavLink>
      </div>
    </>
  )
}
