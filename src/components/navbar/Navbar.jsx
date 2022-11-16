import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logos/logo.png'
import './Navbar.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar--container'>
        <div className='navbar-logo--container'>
          <img className='navbar-logo' src={Logo} alt="" />
        </div>
        <div className='navbar-link--container'>
          <Link className='link navbar-link' to={'/'}>HOME</Link>
          <Link className='link navbar-link' to={'/list'}>LIST</Link>
          <Link className='link navbar-link' to={'/search'}>SEARCH</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar