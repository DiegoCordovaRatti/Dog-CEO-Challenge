import React from 'react'
import Logo from '../../assets/images/logos/logo.png'
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer--container'>
        <div className='footer-logo--container'>
          <img className='footer-logo' src={Logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer