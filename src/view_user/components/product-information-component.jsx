import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../features/cotizations/cotizationDataSlice';

export default function ProductInformationComponent({ product, setState, state }) {

    const [quantity, setQuantity] = useState(1);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewProduct({ 'product': product, 'quantity': quantity, 'subtotal': (product.unit_price * quantity) }))
        setState(false)
    }

    const dispatch = useDispatch();

    const changeValue = (action, e) =>{
        const input = document.querySelector('.input-container input[type="number"]');
        const currentValue = parseInt(e.target.value);
      
        if (action === 'increase') {
          e.target.value = currentValue + 1;
        } else if (action === 'decrease' && currentValue > 1) {
          e.target.value = currentValue - 1;
        }
      
        // Trigger the onChange event manually to update the state or any other logic
        const event = new Event('change', { bubbles: true });
        e.target.dispatchEvent(event);
      }

    // const product = { "imagen_producto": "https://images.unsplash.com/photo-1627445329968-14002337d482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=641&q=80", "nombre_producto": "PRODUCTO PRUEBA CON NOMBRE MEDIANAMENTE LARGO", "precio_unitario": "79.900", "descripcion": "Matera azul linda. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec ex a metus pretium pharetra. Curabitur tempor nulla turpis, eu hendrerit odio pretium vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi ut libero turpis. Nulla pulvinar leo vel ultrices scelerisque.", "ancho": "20.0", "largo": "20.0", "profundidad": "2.02", "cantidad": "5" }
    return (
        <div className="card mb-4" style={{ 'max-width': '950px', 'backgroundColor': '#FFFFF3', 'border': 'none', 'min-width': '900px' }}>
            <div className="row g-0 mx-4 mt-4">
                <div className="col-md-5">
                    <img src={product.product_picture} className="img-fluid " />
                </div>
                <div className="col-md-7">
                    <div className="card-body ">
                        <h5 className="card-title mb-3" id='title'>{product.name_product}</h5>
                        <h6 className="card-subtitle mb-4 " id='price'>$ {product.unit_price.toLocaleString('es-CO')} Iva Incluido.</h6>
                        <div dangerouslySetInnerHTML={{ __html: product.description_product }} className="card-text" id='text'/>
                        {product.status_product === 'N' && 
                        <p className="card-text py-3"><small className="text-danger " id='text'>No Disponible</small></p>
                        }
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <label className="form-label" id='text'>Cantidad:</label>

                                </div>
                                <div className='col-md-3 input-container'>
                                    <input min="1" max={product.quantity} type="number" className="form-control" defaultValue={1} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                
                                </div>
                            </div>
                            {product.status_product !== 'N' && 

                            <div className='row mt-4 justify-content-end'>
                                <div className='col-md-5'>
                                    <button type='submit' className="btn btn-primary" style={{ 'width': '100%', 'color': 'white' }}>AÑADIR →</button>
                                </div>
                            </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}