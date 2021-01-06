import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import reportsReducer from './slices/reportSlice'


const rootReducer = combineReducers({
  auth: authReducer,
  reports: reportsReducer
})



export const store = configureStore({
    reducer: rootReducer
  
})
