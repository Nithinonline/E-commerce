import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ActivationPage, LoginPage, SignUpPage } from './Routes'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import { loadUser } from './redux/actions/user';




function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[]);
 


  return (
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </BrowserRouter>
  )
}

export default App