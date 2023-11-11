import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PDFDocument } from 'pdf-lib';
import swal from 'sweetalert';
import { clear, setNumber } from '../../features/cotizations/cotizationDataSlice';


export default function CotizationConfirmComponent({state, setState,setCotizationCreated}) {


    const cotizationData = useSelector(state => state.cotizationData)
    const dispatch = useDispatch()

    const URI = "https://comprarte-backend-production.up.railway.app/quotes/newQuote"

    const saveCotization = async () => {
        await axios.post(URI, cotizationData)
            .then(function (res) {
                if (res.status === 200) {
                    swal({
                        title: "Cotización registrada con éxito:",
                        icon: "success",
                        timer: 3000,
                    }).then(()=>{
                        setCotizationCreated(true)
                        dispatch(setNumber(res.data.quotation_num))
                    })
                }
            })
    }
    return (
        <>

            <div className='container'>
                <div className='row m-3'>
                    <h3 id='subtitle'>RESUMEN DE TU COTIZACIÓN</h3>
                </div>

                <div className='row mx-4'>
                    <div className="card">
                        <div className="card-header " style={{ background: '#D2691E', color: 'white' }}>
                            DATOS DEL CLIENTE
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p id='text' className='m-0'><strong>Nombre: </strong>{cotizationData.client.nombres_cliente + ' ' + cotizationData.client.apellidos_cliente}</p>
                                <p id='text' className='m-0'><strong>Número de documento: </strong>{cotizationData.client.numero_documento}</p>
                                <p id='text' className='m-0'><strong>Teléfono: </strong>{cotizationData.client.telefono}</p>
                                <p id='text' className='m-0'><strong>Correo electrónico: </strong>{cotizationData.client.email}</p>
                            </blockquote>
                        </div>
                    </div>

                </div>
                <div className='row overflow-auto m-4' style={{ minWidth: "800px", maxHeight: '200px' }}>
                    <table className="table ">
                        <thead>
                            <tr className='text-center' style={{ background: '#D2691E', color: 'white' }}>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio unitario</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cotizationData.products.map((productItem, index) => {
                                return (
                                    <tr>
                                        {/* <th scope="row"></th> */}
                                        <td>{productItem.product.nombre_producto}</td>
                                        <td className='text-center'>{productItem.quantity}</td>
                                        <td className='text-end'>$ {productItem.product.precio_unitario.toLocaleString('es-CO')}</td>
                                        <td className='text-end'>$ {productItem.subtotal.toLocaleString('es-CO')}</td>
                                    </tr>)
                            })}


                        </tbody>
                    </table>
                </div>

                <div className='row mx-4'>

                    <div className='card text-end p-3'>
                        <p id='text' className='m-0'><strong>Total: </strong> $ {cotizationData.total.toLocaleString('es-CO')}</p>
                    </div>

                </div>


                <div className='row align-items-center justify-content-center my-4 text-center'>
                    <div className='col-12 text-center'>
                        <button className='btn btn-primary' style={{ color: 'white', minWidth: '220px' }} onClick={() => { saveCotization() }}> CONFIRMAR →</button>
                    </div>


                </div>

            </div>
        </>
    )
}
