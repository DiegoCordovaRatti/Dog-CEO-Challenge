import React, { useState, useEffect } from 'react';
import { Button, Modal, Carousel, Skeleton } from 'antd';
import './Modal.scss'


const App = (props) => {  
  const images = props.breedImages.map(image =>
    <div className='carousel-img--container'>
      <img className='carousel-img' src={image} alt="" />
    </div>
  )
  return (
    <>
      <Modal 
        className='modal'
        width={'80vw'}
        bodyStyle={{'height': '80vh'}}
        title={props.breed.breed} 
        open={props.isModalOpen} 
        onOk={props.handleOk} 
        onCancel={props.handleCancel}
      > 
        {props.loading ?
          <Skeleton.Image active style={{'width': '70vw', 'height': '70vh'}} />
          :
          <Carousel className='carousel--container' autoplay>
            {images}
          </Carousel>}
      </Modal>
    </>
  );
};
export default App;