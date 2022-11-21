import React from 'react';
import { Modal, Carousel, Skeleton } from 'antd';
import './Modal.scss'


const App = (props) => {  
  const images = props.breedImages.map((image, i) =>
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