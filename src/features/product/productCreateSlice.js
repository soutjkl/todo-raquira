import { createSlice } from "@reduxjs/toolkit";

export const productCreateSlice = createSlice({
    name: 'productData',
    initialState: {
        imagen:"",
        productos:[]
    },
    reducers: {
        setData: (state, action) => {
            state = action.payload
        },
        setImage: (state, action) => {
            state.imagen = action.payload

        },
        clear(state, action) {
            state = action.payload
        },
        addProduct: (state, action) => {
            state.productos.push(action.payload)
        },
        setProducts: (state, action) =>{
            state.productos = action.payload
        }
    }
})

export const { setData, setImage, clear, addProduct, setProducts } = productCreateSlice.actions

export default productCreateSlice.reducer