import { createSlice } from "@reduxjs/toolkit";

export const cotizationDataSlice = createSlice({
    name: 'cotizationData',
    initialState: {
        'client': {
            'id_cliente': 0,
            'nombres_cliente': '',
            'apellidos_cliente': '',
            'tipo_documento': '',
            'numero_documento': '',
            'telefono':'',
            'email': ''
        },
        'products': [],
        'quotation_num': 'COT-000000',
        'date': '',
        'description':'',
        'subtotal': 0,
        'total': 0
    },
    reducers: {
        addNewProduct: (state, action) => {
            const index = state.products.map(productItem => productItem.product.id_product).indexOf(action.payload.product.id_product)
            if (index === -1) {

                state.products.push(action.payload)
            }else{
                state.products[index].quantity += action.payload.quantity
            }
        },
        deleteProduct: (state, action) => {

            const index = state.products.map(productItem => productItem.product.id_product).indexOf(action.payload.id_product)
           

            state.products.splice(index, 1)

        },
        setTotal(state,action){
            state.total = action.payload
        },
        setDescription(state, action){
            state.description = action.payload
        },
        setClientData(state,action){
            state.client = action.payload
        },
        setDate(state, action){
            state.date = action.payload
        },
        setNumber(state, action){
            state.quotation_num = action.payload
        },
        clear(state, action){
            state.client = action.payload.client
            state.products = action.payload.products
            state.description = action.payload.description
            state.date = action.payload.date
            state.subtotal = action.payload.subtotal
            state.total = action.payload.total
        }
    }
})

export const { deleteProduct,addNewProduct, setTotal, setDescription, setClientData,setDate,clear,setNumber} = cotizationDataSlice.actions

export default cotizationDataSlice.reducer