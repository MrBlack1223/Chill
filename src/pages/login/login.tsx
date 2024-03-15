import { useState } from 'react';
import '../register/register.css';
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { LoginCredentials } from '../../types';
import { loginUtils } from '../../Components/utils/userUtils';

const defaultData = {
    email:'',
    password: ''
}

function Login(){
    const [data, setData] = useState<LoginCredentials>(defaultData)
    const [emailSend, setEmailSend] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
          })
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        loginUtils(dispatch,navigate,data,setEmailSend)
    }
  return (
    <div className="login-card-container">
        <div className="login-card">
            <div className="login-card-logo">
                <img src="logo.png" alt="CHILL"/> 
            </div>
            <div className="login-card-header">
                <h1>WELCOME</h1>
                <div>To use the platform, log in</div>
            </div>
            <form className="login-card-form" onSubmit = {handleSubmit}>
                <div className="form-item">
                    <input type="text" placeholder="E-mail" name = 'email' onChange={handleChange} value = {data?.email} required/>
                </div>
                <div className="form-item">
                    <input type="password" placeholder="Password" name = 'password' onChange={handleChange} value = {data?.password} required/>
                </div>
                <div className="form-item-other">
                    {emailSend && <p className='form-item-other-verification'>Before you login, please verify your email</p>}
                    <Link className="login-card-link" to="/remind">I forgot my password!</Link>
                </div>
                <button type="submit">LogIn</button>
            </form>
            <div className="login-card-footer">
                Need an account? <Link className="login-card-link" to="/register">Register</Link>
            </div>
        </div>
    </div>
  );
}

export default Login;