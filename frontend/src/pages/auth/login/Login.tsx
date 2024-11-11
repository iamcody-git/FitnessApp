import  { useEffect } from 'react'
import Form from '../form/Form'
import { useNavigate } from 'react-router-dom'
import { authStatus } from '../../../store/storetypes/storeTypes'
import { UserloginType } from '../types'
import Navbar from '../../components/Navbar'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { login, resetStatus } from '../../../store/authSlice'

const Login = () => {
  const {status}=useAppSelector((state)=>state.auth)

  const navigate =useNavigate()
  const dispatch =useAppDispatch()
  const handlelogin=(data:UserloginType)=>{
    // console.log(data)
    dispatch(login(data))  
  }
  useEffect (()=>{
    if(status===authStatus.success){

      dispatch(resetStatus())
      navigate("/")
    }
  },[status,navigate,dispatch])
  return (
    <>
    <Navbar/>
      <Form type="Login" onSubmit={handlelogin}/>
    </>
  )
}

export default Login