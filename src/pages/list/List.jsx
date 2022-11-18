import React, {useState, useEffect} from 'react'
import { Table, Space, Tag } from 'antd';
import axios from 'axios';
import Modal from '../../components/modal/Modal'
import './List.scss'

const BreedList = () => {
  
  const [breedsAPI, setBreedsAPI] = useState({});
  const [breedCollection, setBreedCollection] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breedImages, setBreedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // API call & asign the response to a state variable
  useEffect(() => {
    axios.get("https://dog.ceo/api/breeds/list/all")
    .then((res) => {
      setBreedsAPI(res.data.message);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  
  // create new array to fill the table
  useEffect(() => {
    setBreedCollection(()=>{
      let breedsArray = [];
      for(const key in breedsAPI) {
        const hasSubBreed = breedsAPI[key].length > 0 ? 
        breedsAPI[key].map(subBreed =>{
          return {subBreed:subBreed, breed: key, images: `${key}/${subBreed}`, isSubBreedOf: key}
        })
        : 
        null;
        
        breedsArray.push({breed: key, subBreeds: hasSubBreed, images: key})
      };
      return breedsArray
    })
  }, [breedCollection, breedsAPI]);
  

  const modalProps = (breedParam, subBreedParam) =>{
    axios(!!subBreedParam ? 
      `https://dog.ceo/api/breed/${breedParam}/${subBreedParam}/images`:
      `https://dog.ceo/api/breed/${breedParam}/images`
      )
    .then((result) => {
      setBreedImages(result.data.message)
      setSelectedBreed(() => (!!subBreedParam ?
        {breed: `${subBreedParam.toUpperCase()} ${breedParam.toUpperCase()}`} :
        {breed: `${breedParam.toUpperCase()}` }))
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleLoading = () =>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleClick = (breedParam, subBreedParam) =>{
    modalProps(breedParam, subBreedParam)
    showModal()
    handleLoading()
  }
  
  const columns = [
    {title: 'Breed', dataIndex: 'breed', key: 'breed'},
    {title: 'Sub-Breed', 
    dataIndex: 'subBreeds',
    key:'subBreeds',
    render: (_, record) => (
      <Space size="middle">
        {!!record.subBreed ?
          record.subBreed.map(subBreed =>
            <Tag className='tag' key={subBreed} color={'geekblue'}>
              <h3 onClick={()=>{handleClick(subBreed.breed, subBreed.subBreed)}}>
                {`${subBreed.subBreed.toUpperCase()} ${subBreed.breed.toUpperCase()}`}
              </h3>
            </Tag>
            )
            :
            <></>
          }
      </Space>
    )},
    {
      title: 'View More', 
      dataIndex: 'action', 
      key:'action',
      render: (_, record) => (
        <Space size="middle">
          <h3 className='action' onClick={()=>{handleClick(record.breed)}}>More</h3>
        </Space>
    )
  },
]

const data = breedCollection.map((breedItem, i)=>{
  return {
    key: i,
    breed: breedItem.breed,
    subBreed: breedItem.subBreeds,
  }
})

return (
  <div className='list'>
    {!!selectedBreed && 
    <Modal 
    breed={selectedBreed} 
    breedImages={breedImages}
    isModalOpen={isModalOpen}
    loading={loading}
    handleOk={()=>{
      setIsModalOpen(false);
    }} 
    handleCancel={()=>{
      setIsModalOpen(false);
    }}
    /> 
    }
    <div className='list--container'>
      <Table columns={columns} dataSource={data} bordered/>
    </div>
  </div>
  )
}

export default BreedList

