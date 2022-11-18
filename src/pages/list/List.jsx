import React, {useState, useEffect} from 'react'
import { Table, Space, Tag, Checkbox } from 'antd';
import axios from 'axios';
import Modal from '../../components/modal/Modal'
import './List.scss'

const BreedList = () => {
  
  const [breedsAPI, setBreedsAPI] = useState({});
  const [breedsApiArray, setBreedsApiArray] = useState([]);
  const [breedCollection, setBreedCollection] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breedImages, setBreedImages] = useState([]);
  const [filterBreedApi, setFilterBreedApi] = useState([]);
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
      let breeds = []
      for(const key in breedsAPI) {
        breeds.push({
        breed: key,
        subBreeds: breedsAPI[key].length ? breedsAPI[key] : []
        })
        const hasSubBreed = breedsAPI[key].length > 0 ? 
        breedsAPI[key].map(subBreed =>{
          breedsArray.push({name: `${key} ${subBreed}`, breed: key, subBreed:subBreed, subBreeds: null, images: `${key}/${subBreed}`, isSubBreedOf: key})
          return {name: `${key} ${subBreed}`, breed: key, subBreed:subBreed, subBreeds: null, images: `${key}/${subBreed}`, isSubBreedOf: key}
        })
        : 
        null;
        breedsArray.push({name: key, breed: key, subBreed:null, subBreeds: hasSubBreed, images: key, isSubBreedOf: null})
      };
      setBreedsApiArray(breeds)
      return breedsArray
    })

  }, [breedCollection, breedsAPI, breedsApiArray]);
  
  const modalProps = (breedParam, subBreedParam) =>{
    axios(!!subBreedParam ? 
      `https://dog.ceo/api/breed/${breedParam}/${subBreedParam}/images`:
      `https://dog.ceo/api/breed/${breedParam}/images`
      )
    .then((result) => {
      setBreedImages(result.data.message);
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
    modalProps(breedParam, subBreedParam);
    showModal();
    handleLoading();
  }
  
  const columns = [
    {title: 'Name', dataIndex: 'name', },
    {title: 'Breed', dataIndex: 'breed', },
    {
      title: 'Sub-Breed', 
      dataIndex: 'subBreeds',
      
      render: (_, record) => (
        <Space size="middle">
          {!!record.subBreed ?
            record.subBreed.map(subBreed =>
              <Tag className='tag' key={subBreed} color={'geekblue'}>
                <h3 onClick={()=>{handleClick(subBreed.breed, subBreed.subBreed)}}>
                  {`${subBreed.name.toUpperCase()}`}
                </h3>
              </Tag>
              )
              :
              <></>
            }
        </Space>
      )
    },
    {
      title: 'View More', 
      dataIndex: 'action', 
      
      render: (_, record) => (
        <Space size="middle">
          <h3 className='action' onClick={()=>{handleClick(record.breed)}}>More</h3>
        </Space>
    )
  },
]


const filterBreeds = (checkedValues) => {
  console.log(checkedValues)
  const filteredArray = breedCollection.filter(item =>
    checkedValues.some(checkedValue => item.breed.includes(checkedValue))
    )
  setFilterBreedApi(filteredArray)
};
  
const breedArray = filterBreedApi.length ? filterBreedApi : breedCollection;

const data = breedArray.map((breedItem, i)=>{
  return {
    key: i,
    name: breedItem.name.toUpperCase(),
    breed: breedItem.breed,
    subBreed: breedItem.subBreeds,
  }
})

const createCheckBox = (
  <>
    <div className='filter--title--container'><h3 className='filter--title'>Filter 🐶 By</h3></div>
    <Checkbox.Group 
      className='filter--checkbox'
      onChange={filterBreeds} 
    >
      {breedsApiArray.map((breed) =>
        <>
          <Checkbox style={{'margin': '10px 0 10px 10px'}} value={breed.breed}>{breed.breed.toUpperCase()}</Checkbox>
          {
            breed.subBreeds.length ? breed.subBreeds.map(subBreed =>
              <div style={{'margin': '10px 0 10px 30px'}}>
                <Checkbox value={subBreed}>{subBreed.toUpperCase()} {breed.breed.toUpperCase()}</Checkbox>
              </div>
            )
            :
            <></>
          }
        </>
      )}
    </Checkbox.Group>
  </>
)

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
      <div className='filter'>
        {createCheckBox}
      </div>
      <div className='table'>
        
        <Table columns={columns} dataSource={data} bordered style={{'backgroundColor': 'volcano'}}/>
      </div>
    </div>
  </div>
  )
}

export default BreedList

