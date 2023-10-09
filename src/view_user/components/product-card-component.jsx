import React from 'react'


export default function ProductCard({ product, productSelection, setModalWindowState, modalWindowState }) {
    return (

        <div className="card shadow m-3 position-relative" style={{ width: '15rem' }} onClick={()=>{setModalWindowState(!modalWindowState); productSelection(product)}}>
            <img src={product.product_picture} className="card-img-top p-3 pt-4 m-0" alt="..." />
            <div className="card-body pt-0">
                <h5 className="card-title m-0" id='text'>{product.name_product}</h5>
                <p className="card-text m-0" id='price' >${product.unit_price.toLocaleString('es-CO')}</p>
            </div>
            {product.status_product === 'N' &&
            <div className="position-absolute top-50 start-50 translate-middle align-items-center justify-content-center row" style={{width:'100%', height:'100%', background:'rgba(76,70,61,0.7)', color:'white', marginLeft:'0'}}>NO DISPONIBLE</div>
            }
        </div>
    )
}
