import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight, faArrowLeft, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ProductCard from './product-card-component'
import axios from 'axios';
import { useState, useEffect } from 'react';
import ModalWindow from './modal-window';
import ProductInformationComponent from './product-information-component';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../features/cotizations/productSlice';


export default function CategoryComponent({ category, goBack }) {


    const URI = `https://comprarte-backend-production.up.railway.app/product/category/${category.id_category}`
    const [page, setPage] = useState(1)
    const [topPage, setTopPage] = useState(1)
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        await axios.get(URI).then(function (res) {
            dispatch(setProducts(res.data))
            setTopPage(Math.ceil(products.length / 8))
        })
    }

    useEffect(() => {
        setTopPage(Math.ceil(products.length / 8))
    }, [products, dispatch])

    const [modalState, setModalState] = useState(false);
    const [productSelected, setproductSelected] = useState({});

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
                <div className='row '>
                    <h1 className="m-5" id="title"><FontAwesomeIcon icon={faArrowLeft} className='mx-4' style={{color:'rgba(210, 105, 30, 1)', cursor:'pointer'}} onClick={() => goBack()} />{category.name_category.toUpperCase()}</h1>
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
                                    <h5 id='subtitle'>No existen productos en esta categoría</h5>
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
                                    <button className='btn btn-primary m-1' style={{ color: 'white' }} id='subtitle' onClick={nextPage}><FontAwesomeIcon icon={faArrowRight} disabled={page === topPage ? true : false} /></button>
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

