import {createSlice, current} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        isFetching:false,
        currentUser:null,
        IsFailure:false
    },
    reducers:{
        loginStart:(state)=>{
           state.isFetching = true
        }, 
        loginSuccess:(state, action)=>{
            state.isFetching = false,
            state.currentUser = action.payload,
            state.IsFailure = false
        },
        loginFailure:(state)=>{
            state.isFetching = false,
            state.IsFailure = true
        }, 
        logout:(state)=>{
            state.currentUser = null;
        }, 
        
    }
})

export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions
export default userSlice.reducer