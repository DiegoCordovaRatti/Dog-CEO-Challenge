import React from 'react';
import { Modal, Carousel, Skeleton } from 'antd';
import './Modal.scss'


const App = ({breedImages, breed, isModalOpen, handleOk, handleCancel, loading}) => {  
  const images = breedImages.map((image, i) =>
    <div key={i} className='carousel-img--container'>
      <img key={i} className='carousel-img' src={image} alt="" />
    </div>
  )
  return (
    <>
      <Modal 
        className='modal'
        width={'80vw'}
        bodyStyle={{'height': '80vh'}}
        title={breed} 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
      > 
        {loading ?
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