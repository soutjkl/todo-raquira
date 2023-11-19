import { createSlice } from "@reduxjs/toolkit";

export const workshopSlice = createSlice({
    name: 'workshop',
    initialState: [],
    reducers: {
        addWorkshop: (state, action) => {
            state.push(action.payload)
        },
        setWorkshop: (state, action) =>{
            return action.payload
        }
    }
})

export const { addWorkshop, setWorkshop } = workshopSlice.actions

export default workshopSlice.reducer