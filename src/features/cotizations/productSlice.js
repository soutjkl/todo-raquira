import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        },
        setProducts: (state, action) =>{
            return action.payload
        }
    }
})

export const { addProduct, setProducts } = productsSlice.actions

export default productsSlice.reducer