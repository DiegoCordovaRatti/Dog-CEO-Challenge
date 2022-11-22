import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logos/logo.png'
import Dog1 from "../../assets/images/img/1-dachshund.gif";
import Dog2 from "../../assets/images/img/2-dachshund.gif";
import './Navbar.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="dog-animation--container">
        <img className='dog-animation dog-animation--black' src={Dog1} alt="" />
        <img className='dog-animation dog-animation--brown' src={Dog2} alt="" />
      </div>
      <div className='navbar--container'>
        <div className='navbar-logo--container'>
          <img className='navbar-logo' src={Logo} alt="" />
        </div>
        <div className='navbar-link--container'>
          <Link className='link navbar-link' to={'/'}>HOME</Link>
          <Link className='link navbar-link' to={'/list'}>LIST</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar