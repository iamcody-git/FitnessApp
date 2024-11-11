import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/about/About'
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'
import { Provider } from 'react-redux'
import store from './store/store'
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
     </Routes>
     </BrowserRouter>
     </Provider>
      
    </>
  )
}

export default App
