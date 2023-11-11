import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategory } from '../../features/categories/categoriesSlice';
import CategoryComponent from './category-component';

export default function CategoriesComponent() {

  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selected, setSelected] = useState(false)
  const URI = 'https://comprarte-backend-production.up.railway.app/categoriesAll'

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    await axios.get(URI).then(function (res) {
      dispatch(setCategory(res.data))
    })
  }
  const handleOnClick = (category) => {
    setSelectedCategory(category)
    setSelected(true)
  }
  const goBack =() =>{
    setSelected(false)
    setSelectedCategory({})
  }
  return (
    <>
      {!selected &&
        <div className='container'>
          <div className='row'>
            <h1 className="m-5" id="title">CATEGORÍAS</h1>
          </div>

          <div className="row m-4 dflex" style={{ paddingLeft: '3%' }}>
            {categories.map((category, index) => {
              return (
                <div className="card m-3 justify-content-center align-items-center" style={{ width: '15rem', height: '80px', cursor: 'pointer' }} onClick={()=>handleOnClick(category)}>
                  <div className="card-body p-0 text-center row justify-content-center align-items-center " style={{ width: '100%', height: '100%' }}>
                    <h5 className="card-title m-0 col-auto" id='subtitle' style={{ color: '#d2691e' }}>{category.name_category.toUpperCase()}</h5>
                  </div>
                </div>
              )
            }
            )}

          </div>
        </div>
      }
      {selected &&
        <CategoryComponent category={selectedCategory} goBack={goBack}/>
      }
    </>
  )
}
