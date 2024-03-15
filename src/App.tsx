import './App.css';
import Header from './pages/header/header';
import { Routes, Route } from 'react-router-dom'
import MainChat from './pages/chat/mainChatPage';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import VerifyEmail from './pages/verifyEmail/verifyEmail';
import Remindpassword from './pages/remindpassword/remindPassword';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from './Redux/UserSlice';
import { ToastContainer } from 'react-toastify';
import ChangePassword from './pages/home/homeComponents/changePassword/changePassword';

function App(){
 
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(connect())
  },[dispatch])

  return (
    <div> 
      <Header />
      <Routes>
        <Route path = '/chat' element = {<MainChat />}/>
        <Route path = '/' element={<Home />}/>
        <Route path = '/login' element={<Login />} />
        <Route path = '/register' element={<Register />} />
        <Route path = '/user/:id/verify/:token' element = {<VerifyEmail />} />
        <Route path = '/remind' element = {<Remindpassword />} />
        <Route path = '/changePassword' element = {<ChangePassword />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
