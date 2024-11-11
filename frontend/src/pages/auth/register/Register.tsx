import  { useEffect } from 'react'
import Form from '../form/Form'
import { UserDataTypes } from '../types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { register, resetStatus } from '../../../store/authSlice'
import { authStatus } from '../../../store/storetypes/storeTypes'
import Navbar from '../../components/Navbar'


const Register = () => {
  const {status}=useAppSelector((state)=>state.auth)
  const navigate =useNavigate()
  const dispatch =useAppDispatch()
  const handleRegister=(data:UserDataTypes)=>{
    dispatch(register(data))  
  }
  useEffect (()=>{
    if(status===authStatus.success){
      dispatch(resetStatus())
      navigate("/login")
    }
  },[status,navigate,dispatch])
  return (
    <>
    <Navbar/>
    <Form type="Register" onSubmit={handleRegister}/>
    </>
  )
}

export default Register