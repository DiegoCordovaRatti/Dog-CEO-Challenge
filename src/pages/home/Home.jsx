import React from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../../assets/images/img/banner.jpg'
import './Home.scss'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='home'>
      <div className="home--container">
        <div className="banner--container">
          <img className='banner' src={Banner} alt="" />
          <div className="banner-text--container">
            <p className='banner-text'>Curious about any breed?</p>
            <p className='banner-text'>Get to know them all</p>
            <button className='banner-button' onClick={() => navigate('/list')}>Know more!</button>
          </div>
        </div>
        <div className="summary--container">

        </div>
      </div>
    </div>
  )
}

export default Home 