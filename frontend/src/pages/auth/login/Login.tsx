import  { useEffect } from 'react'
import Form from '../form/Form'
import { useNavigate } from 'react-router-dom'
import { authStatus } from '../../../store/storetypes/storeTypes'
import { UserloginType } from '../types'
import Navbar from '../../components/Navbar'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { login, resetStatus } from '../../../store/authSlice'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {
  const {status,errorMessage}=useAppSelector((state)=>state.auth)

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
    }else if (status === authStatus.error && errorMessage) {
      toast.error(errorMessage); 
      dispatch(resetStatus());
    }
  },[status,navigate,dispatch])
  return (
    <>
    <Navbar/>
      <Form type="Login" onSubmit={handlelogin}/>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      {status === authStatus.error && errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </>
  )
}

export default Login