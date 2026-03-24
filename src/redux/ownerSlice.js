import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        myPropertyData: null,
        singleProperty:[],
        TenantDataAll:[],
        AssignedTenantTo:[],
       
    },
    reducers: {
        setPropertyData: (state, action) => {
            state.myPropertyData = action.payload;
        },
         setSingleProperty:(state,action)=>{
            state.singleProperty=action.payload
        },
        setTenantDataAll:(state,action)=>{
            state.TenantDataAll=action.payload
        },
        setAssignedTenantTo:(state,action)=>{
            state.AssignedTenantTo=action.payload
        },
       

    }
});

export const { setPropertyData , setSingleProperty,setTenantDataAll,setAssignedTenantTo} = ownerSlice.actions;
export default ownerSlice.reducer;