import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        addCategory: (state, action) => {
            state.push(action.payload)
        },
        setCategory: (state, action) =>{
            return action.payload
        }
    }
})

export const { addCategory, setCategory } = categoriesSlice.actions

export default categoriesSlice.reducer