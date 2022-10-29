import '../assets/styles/Navbar.scss'
import logo from '../assets/images/logo-1.svg'
import hamburger from '../assets/images/navbar.svg'
import close from '../assets/images/close.svg'
import park from '../assets/images/park.svg'
import setting from '../assets/images/setting.svg'

import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className='nav'>
      <div className='nav-container'>
        <Link to='/'>
          <img src={logo} alt='logo' className='nav-container_logo' />
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

        <ul className={isExpanded ? 'nav-container_list expanded' : 'nav-container_list'}>
          <NavbarLink to='/parking'>
            <img src={park} className='nav-container_item_img' alt='' />
            <div className='nav-container_item_title'>停車</div>
          </NavbarLink>
          <NavbarLink to='/setting'>
            <img src={setting} className='nav-container_item_img' alt='' />
            <div className='nav-container_item_title'>設定</div>
          </NavbarLink>
        </ul>
      </div>
    </nav>
  )
}

// props for className
function NavbarLink({ to, children }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li className='nav-container_item'>
      <Link to={to} className={`nav-container_item_link ${isActive ? 'active' : ''}`}>
        {children}
      </Link>
    </li>
  )
}
