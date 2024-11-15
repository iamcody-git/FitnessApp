import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { Initialstate } from '../types/data'
import { authStatus } from '../types/status'
import { Product } from '../types/product'

const initialState:Initialstate={
    products:[],
    users:[],
    orders:[],
    status:authStatus.loading

}

const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
        setStatus(state:Initialstate,action:PayloadAction<authStatus>){
            state.status=action.payload
        },
        setProducts(state:Initialstate,action:PayloadAction<Product[]>){
            state.products=action.payload
    }
})