import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/about/About'
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'
import { Provider } from 'react-redux'
import store from './store/store'
import Packages from './pages/Services'
import UserProfile from './pages/userProfile/UserProfile'
import UserDashboard from './pages/userProfile/UserDashboard'

function App() {
  return (
    <>
    <Provider store={store}>
     <BrowserRouter>
     <Routes>
      <Route path="/" element= {<Home/>}/>
      <Route path="/about" element= {<About/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/> 
      <Route path="/service" element={<Packages/>}/> 
      <Route path="/userprofile" element={<UserProfile/>}/> 
      <Route path="/userprofile/dashboard/:id" element={<UserDashboard/>}/> 
     </Routes>
     </BrowserRouter>
     </Provider>
      
    </>
  )
}

export default App
