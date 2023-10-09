import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../features/cotizations/cotizationDataSlice';

export default function ListItem({productItem}) {

    const removeProduct = ()=>{
        dispatch(deleteProduct(productItem.product))
    }

    const dispatch = useDispatch();
    return (

        <div className="row  align-items-center">
            <div className="col-md-2 my-2">
                <img src={productItem.product.imagen_producto} className="img-fluid " alt="..." style={{'maxWidth':'100px'}} />
            </div>
            <div className="col-md-10 my-2">
                <div className='row m-0 gy-0'>
                    <div className='col-md-6'>
                        <p id='text' >{productItem.product.nombre_producto}</p>
                    </div>
                    <div className='col-md-6 text-end'>
                        <p id='text' >Precio Unitario: ${productItem.product.precio_unitario.toLocaleString('es-CO')}</p>
                    </div>
                </div>
                <div className='row align-items-end m-0 gy-0'>
                    <div className='col-md-6 text-muted'>
                        <p id='text' >Cantidad: {productItem.quantity}</p>
                    </div>
                    <div className='col-md-6 text-end'>
                        <p id='text' ><strong>Subtotal: ${(productItem.subtotal).toLocaleString('es-CO')}</strong></p>
                    </div>
                </div>
                <div className='row text-end m-0 gy-0'>
                    <a href='#' className='card-link' id='link' onClick={()=>{removeProduct()}} >Eliminar</a>

                </div>

            </div>
        </div>


    )
}