import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import reportsReducer from './slices/reportSlice'
import mapReducer from './slices/mapSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  reports: reportsReducer,

  map: mapReducer 
})



export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false
    }),
})
