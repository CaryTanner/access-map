import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchVerifyUser} from '../../redux/slices/authSlice'


export default function HomePage(){
  const dispatch = useDispatch()
 const {token} = useSelector(state => state.auth)
 
  useEffect(()=> {
    
    dispatch(fetchVerifyUser(token))

  
  }, [token, dispatch])

  return (
      <>
      <p>home page mchome face </p>
      </>
  ) 
   
    
}