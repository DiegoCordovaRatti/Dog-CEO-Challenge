import React, {useState, useEffect} from 'react'
import { Table, Space, Tag, Checkbox } from 'antd';
import Modal from '../../components/modal/Modal'
import './List.scss'

const BreedList = () => {
  
  const [breedsAPI, setBreedsAPI] = useState({});
  const [breedsApiArray, setBreedsApiArray] = useState([]);
  const [breedCollection, setBreedCollection] = useState([]);
  const [filterBreedApi, setFilterBreedApi] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedImages, setBreedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // API call & asign the response to a state variable
  useEffect(() => {
    const fetchApiCall = async() =>{
      const { message } = await fetch('https://dog.ceo/api/breeds/list/all').then(response => response.json());
      setBreedsAPI(message)
    }
    fetchApiCall()
  }, []);
  
  useEffect(() => {
    setBreedsApiArray(()=>{
      let breeds = []
      for(const key in breedsAPI) {
        breeds.push({
        breed: key,
        subBreeds: breedsAPI[key].length ? breedsAPI[key] : []
        })
      }
      setBreedCollection(()=>{
        let breedsArray = [];
        breeds.forEach(breed => {
            const hasSubBreed = breed.subBreeds.length > 0 ? 
            breed.subBreeds.map(subBreed =>{
              const subBreedObj = {
                name: `${breed.breed} ${subBreed}`, 
                breed: breed.breed, 
                subBreed:subBreed, 
                subBreeds: null, 
                isSubBreedOf: breed.breed, 
                images: `${breed.breed}/${subBreed}`, 
              }
              breedsArray.push(subBreedObj)
              return subBreedObj
            })
            : 
            null;
            breedsArray.push({
              name: breed.breed, 
              breed: breed.breed, 
              subBreed:null, 
              subBreeds: hasSubBreed, 
              isSubBreedOf: null, 
              images: breed.breed, 
            })
        });
        return breedsArray
      })
      return breeds
    })
    console.log(breedsAPI)
    console.log(breedsApiArray)
    console.log(breedCollection)
  }, [breedsAPI]);
  

  const modalProps = (breedParam, subBreedParam) =>{
    fetch(!!subBreedParam ? 
      `https://dog.ceo/api/breed/${breedParam}/${subBreedParam}/images`:
      `https://dog.ceo/api/breed/${breedParam}/images`
      )
    .then(res => res.json())
    .then((data) => {
      setBreedImages(data.message);
      setSelectedBreed(() => (!!subBreedParam ? `${subBreedParam.toUpperCase()} ${breedParam.toUpperCase()}` : `${breedParam.toUpperCase()}`))
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
    {
      title: 'Breed', 
      dataIndex: 'breedName',
    },
    {
      title: 'Sub-Breed', dataIndex: 'subBreeds',
      render: (_, record) => (
        <Space size="middle" className='tag--container'>
          {!!record.subBreed ?
            record.subBreed.map((subBreed, i) =>
              <Tag className='tag' key={subBreed + i} color={'geekblue'}>
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
      title: 'Images', dataIndex: 'breed', 
      render: (_, record) => (
        <Space size="middle">
          <h3 className='action' onClick={()=>{handleClick(record.breed)}}>View all</h3>
        </Space>
    )
  },
]

const filterBreeds = (checkedValues) => {
  const filteredArray = breedCollection.filter(item =>{
    return checkedValues.some(checkedValue => item.name.includes(checkedValue))
  })
  setFilterBreedApi(filteredArray)
};
  
const breedArray = filterBreedApi.length ? filterBreedApi : breedCollection;

const data = breedArray.map((breedItem, i)=>{
  return {
    key: i,
    breedName: breedItem.name.toUpperCase(),
    breed: breedItem.name,
    subBreed: breedItem.subBreeds,
  }
})

return (
  <div className='list' data-testid="listTest">
    {!!selectedBreed && 
      <Modal  breed={selectedBreed}  breedImages={breedImages} isModalOpen={isModalOpen} loading={loading}
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
        <div className='filter--title--container'><h3 className='filter--title'>Filter 🐶 By</h3></div>
          <Checkbox.Group 
            className='filter--checkbox'
            onChange={filterBreeds} 
          >
            {breedsApiArray.map((breed) =>
              <>
                <Checkbox style={{'margin': '10px 0 10px 10px'}} value={breed.breed}>
                  {breed.breed.toUpperCase()}
                </Checkbox>
                {
                  breed.subBreeds.length ? breed.subBreeds.map(subBreed =>
                    <div style={{'margin': '10px 0 10px 30px'}}>
                      <Checkbox data-testid="CHECKBOX_ID" value={`${breed.breed} ${subBreed}`}>{subBreed.toUpperCase()} 
                        {breed.breed.toUpperCase()}
                      </Checkbox>
                    </div>
                  )
                  :
                  <></>
                }
              </>
            )}
          </Checkbox.Group>
        </div>
      <div className='table'>
        <Table size='small' columns={columns} dataSource={data} bordered style={{'backgroundColor': 'volcano'}}/>
      </div>
    </div>
  </div>
  )
}

export default BreedList

