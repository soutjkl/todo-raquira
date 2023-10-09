import React, { useState } from 'react'
import ListItem from './list-item-component'
import { useDispatch, useSelector } from 'react-redux'
import ModalWindow from './modal-window'
import ClientDataComponent from './client-data-component'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { setDate, setDescription, setTotal } from '../../features/cotizations/cotizationDataSlice'
import CotizationConfirmComponent from './cotization-confirm-component'
import CotizationPrintComponent from './cotization-print-component'



export default function CotizationComponent() {

  const cotizationData = useSelector(state => state.cotizationData)
  const [clientCreated, setClientCreated] = useState(false)
  const [descriptionState, setDescriptionState] = useState(false)
  const [modalState, setModalState] = useState(false)
  const [cotizationCreated, setCotizationCreated] = useState(false)

  const calculateTotal = () => {
    let total = 0
    cotizationData.products.map((productItem) => {
      total = total + (productItem.product.precio_unitario * productItem.quantity)
    })

    return total
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const transport = descriptionState ? "Se incluye transporte" : "No se incluye transporte"

    const today = new Date();
    const now = today.toLocaleDateString('es-CO');
    dispatch(setDescription(transport))
    dispatch(setDate(now))
    dispatch(setTotal(calculateTotal()))
    setModalState(true)
  }

  const dispatch = useDispatch()



  return (
    <>
      <div className='container'>
        <div className='row'>
          <h1 className="m-5" id="title"> TU COTIZACIÓN</h1>
        </div>
        {(cotizationData.products.length > 0) ?

          <div className='row'>
            <div className='col-md-8 '>
              <div className="card mx-5" style={{ 'width': '90%' }}>
                <ul className="list-group list-group-flush">

                  {cotizationData.products.map((productAux, index) => {
                    return (<li key={index} className="list-group-item"><ListItem productItem={productAux} /></li>)
                  })}
                </ul>
              </div>
            </div>
            <div className='col-md-4 '>
              <form onSubmit={handleSubmit}>
                <div className="card" style={{ 'width': '80%' }}>
                  <div className="card-body text-end p-5">
                    <input className="form-check-input mr-5" type="checkbox" value="Se incluye transporte" id="flexCheckDefault" onChange={(e) => setDescriptionState(!descriptionState)} />
                    <label className="form-check-label mx-3" for="flexCheckDefault" id='text'>
                      Incluir trasporte
                    </label>

                    <h5 className="card-title mt-5" id='price'><strong>Total:</strong> ${calculateTotal().toLocaleString('es-CO')}</h5>
                  </div>
                </div>
                <button type='submit' className='btn btn-primary my-5' style={{ 'color': 'white', 'width': '80%' }} s  >FINALIZAR →</button>

              </form>
            </div>
          </div>
          :
          <div className='position-absolute top-50 start-50 translate-middle' style={{marginLeft:'10%', width:'100%'}}>

            <div className='row justify-content-center align-items-center'>
              <div className='col-4  text-center'>
                <FontAwesomeIcon icon={faExclamationCircle} bounce style={{ color: '#D2691E', width: '100px', height: '100px' }} />
              </div>

              <div className='row justify-content-center align-items-center '>
                <div className='col-4 mt-5  text-center'>
                  <h5 id='subtitle'>Aun no has agregado ningún producto a tu cotización</h5>
                </div>
              </div>

            </div>
          </div>}
        <ModalWindow state={modalState} setState={setModalState}>
          {/* <CotizationConfirmComponent/> */}
          {/*clientCreated ? <CotizationConfirmComponent state={modalState} setState={setModalState} setCotizationCreated={setCotizationCreated} /> : <ClientDataComponent state={modalState} setState={setModalState} setClientCreated={setClientCreated} />*/}
          {cotizationCreated ?<CotizationPrintComponent state={modalState} setState={setModalState}/>: clientCreated ? <CotizationConfirmComponent state={modalState} setState={setModalState} setCotizationCreated={setCotizationCreated}/> : <ClientDataComponent state={modalState} setState={setModalState} setClientCreated={setClientCreated} />}          
        </ModalWindow>
      </div>
    </>
  )


}
