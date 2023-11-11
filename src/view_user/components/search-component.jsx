import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass, faArrowRight, faArrowLeft, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ProductCard from './product-card-component'
import axios from 'axios';
import { useState, useEffect } from 'react';
import ModalWindow from './modal-window';
import ProductInformationComponent from './product-information-component';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../features/cotizations/productSlice';


export default function SearchComponent() {


  const URI = 'https://comprarte-backend-production.up.railway.app/product'
  const URI_SEARCH = 'https://comprarte-backend-production.up.railway.app/searchProducts'

  const [stringToSearch, setStringToSearch] = useState('')
  const [page, setPage] = useState(1)
  const [topPage, setTopPage] = useState(1)
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    await axios.post(URI_SEARCH, { stringToSearch: stringToSearch }).then(function (res) {
      dispatch(setProducts(res.data))
      setTopPage(Math.ceil(products.length / 8))
    })
  }

  useEffect(() => {
    setTopPage(Math.ceil(products.length / 8))
  }, [products, dispatch])

  const [modalState, setModalState] = useState(false);
  const [productSelected, setproductSelected] = useState({});

  const searchProducts = async () => {
    try {
      await axios.post(URI_SEARCH, { stringToSearch: stringToSearch })
        .then(function (res) {
          dispatch(setProducts(res.data))
        })
      setTopPage(Math.ceil(products.length / 8))
    } catch (error) {
      console.log(error.message)
    }
  }

  const nextPage = () => {
    if (page < topPage)
      setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 1)
      setPage(page - 1)
  }

  return (
    <>
      <div className='container dflex'>
        <div className='row m-4'>
          <div className='col-5'></div>
          <div className='col-7'>
            <div className="d-flex">
              <input className="form-control me-2" type="search" onBlur={searchProducts} style={{ background: 'none', border: 'solid 2px', borderColor: 'rgba(76,70,61,0.7)', fontFamily: 'Poppins' }} placeholder="Buscar productos ..." aria-label="Search" onChange={(e) => {
                setStringToSearch(e.target.value)
                searchProducts()
              }
              } />
              <button className="btn btn-outline-primary" style={{ border: 'solid 2px' }} type="submit" onClick={searchProducts}><FontAwesomeIcon size='lg' icon={faMagnifyingGlass} /></button>
            </div>
          </div>
        </div>
        {products.length > 0 ?
          <div className="row m-4 dflex" style={{ paddingLeft: '3%' }}>
            {products.map((product, index) => {
              if (index < (page * 8) && index >= ((page * 8) - 8))
                return <ProductCard key={product.id_product} product={product} setModalWindowState={setModalState} modalWindowState={modalState} productSelection={setproductSelected} />
            })}
          </div>
          :
          <div className='position-absolute top-50 start-50 translate-middle' style={{ marginLeft: '10%', width: '100%' }}>
            <div className='row justify-content-center align-items-center' >
              <div className='col-4  text-center'>
                <FontAwesomeIcon icon={faExclamationCircle} bounce style={{ color: '#D2691E', width: '100px', height: '100px' }} />
              </div>
              <div className='row justify-content-center align-items-center'>
                <div className='col-4 mt-5  text-center'>
                  <h5 id='subtitle'>No existen coincidencias con tu búsqeda</h5>
                </div>
              </div>
            </div>
          </div>
        
        }
        {products.length > 0 &&
          <div className='row m-4 justify-content-end'>
            <div className='col-3 m-4 position-absolute bottom-0' >
              <div className='float-end'>
                {page > 1 &&
                  <button className='btn btn-primary m-1 ' style={{ color: 'white' }} id='subtitle' onClick={prevPage}><FontAwesomeIcon icon={faArrowLeft} disabled={page > 1 ? true : false} /></button>
                }
                {page < topPage &&
                  <button className='btn btn-primary m-1' style={{ color: 'white' }} id='subtitle' onClick={nextPage}><FontAwesomeIcon icon={faArrowRight} disabled={page === topPage ? true : false}/></button>
                }
              </div>
            </div>
          </div>
        }
        <ModalWindow state={modalState} setState={setModalState}>
          <ProductInformationComponent product={productSelected} state={modalState} setState={setModalState} />
        </ModalWindow>
      </div>



    </>
  )


}

