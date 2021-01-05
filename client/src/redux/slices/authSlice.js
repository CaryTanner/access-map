import { createSlice } from '@reduxjs/toolkit'
import {loginUser, registerUser, verifyUser} from '../../api/userAuthAPI'



// TODO - create forgot password front & backend 
function startLoading(state) {
    state.isLoading = true
  }
  
  function loadingFailed(state, action) {
    
    state.isLoading = false
    state.error = action.payload
  }

const authSlice = createSlice({
    name: "auth",
    initialState: {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      isLoading: null,
      user: null,
      error: null,
      role: null
    },
    reducers: {
      logoutUser(state, action) {
          localStorage.removeItem('token')
          state.token = null;
          state.isLoading = null;
          state.isAuthenticated = false;
          state.user = null;
          state.error = null;
          state.role = null;
        },
      
      clearError(state, action) {
            state.error = null;
          },
    loginStart: startLoading,
    
    loginSuccess(state, payload){
      console.log(payload.payload)
      
    const { token, user } = payload.payload.data
      
      localStorage.setItem('token', token)
      state.token = token
      state.isAuthenticated = true
      state.user = user
      state.isLoading = false
      state.error = null
      state.role = user.role
    },
  
    loginFailure: loadingFailed,
    registerUserStart: startLoading,
    
    registerUserSuccess(state, payload){
      console.log(payload)
      const { token, user } = payload.payload.data
      localStorage.setItem('token', token)
      state.isAuthenticated = true
      state.user = user
      state.isLoading = false
      state.error = null
      state.role = user.role
    },
  
    registerUserFailure: loadingFailed,
    
    verifyUserStart: startLoading,
    
    verifyUserSuccess(state, payload){
      console.log(payload)
      
      
      state.isAuthenticated = true
      state.user = payload.payload.data
      state.isLoading = false
      state.error = null
      state.role = payload.payload.data.role
    },
  
    verifyUserFailure(state, payload){
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    
  
  }
  

    
   
  });
  
 
    
    export const fetchLoginUser = (userInfo) => async dispatch => {
      try {
        dispatch(loginStart())
        const user = await loginUser(userInfo)
        if (user.status !== 200) throw Error(user.data.msg)
        dispatch(loginSuccess(user))
        
      } catch (err) {
        
        dispatch(loginFailure(err.toString()))
      }
    }

    export const fetchRegisterUser = (userInfo) => async dispatch => {
        try {
          dispatch(registerUserStart())
          const user = await registerUser(userInfo)
          if (user.status !== 200) throw Error(user.data.msg)
          dispatch(registerUserSuccess(user))
        } catch (err) {
          dispatch(registerUserFailure(err.toString()))
        }
      }

      //sends token in headers to pass auth middleware in API or role middleware
      export const fetchVerifyUser = (userInfo) => async dispatch => {
        try {
          dispatch(verifyUserStart())
          const user = await verifyUser(userInfo)
          if (user.status !== 200) throw Error(user.data.msg)
          dispatch(verifyUserSuccess(user))
        } catch (err) {
          dispatch(verifyUserFailure(err.toString()))
        }
      }  



  export default authSlice.reducer;
  export const { logoutUser, clearError, loginStart, loginSuccess, loginFailure, registerUserFailure, registerUserStart, registerUserSuccess, verifyUserFailure, verifyUserStart, verifyUserSuccess } = authSlice.actions
