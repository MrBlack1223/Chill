import { useState } from 'react';
import './register.css';
import {Link} from "react-router-dom"
import { RegisterData } from '../../types';
import { registerUtils } from '../../Components/utils/userUtils';

function Register(){
  
  const defaultData: RegisterData = {
    name: "",
    login:"",
    email: "",
    password: ""
  }

  const [data,setData] = useState<RegisterData>(defaultData)
  const [emailSend,setEmailSend] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{ 
    setData({
        ...data,
        [e.target.name]: e.target.value
      })
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    registerUtils(data,setEmailSend,setData,defaultData)
  }

  return (
    <div className="login-card-container">
        <div className="login-card">
            <div className="login-card-logo">
                <img src="logo.png" alt="Chill"/> 
            </div>
            <div className="login-card-header">
                <h1>Create an account</h1>
                <div>Please create an account to use the platform</div>
            </div>
            <form className="login-card-form" onSubmit={handleSubmit}>
                <div className="form-item">
                    <input type="text" placeholder="Enter Email"  name="email" value = {data?.email} onChange={handleChange} required/>
                </div>
                <div className="form-item">
                    <input type="text" placeholder="Enter Name"  name="name" value = {data?.name} onChange={handleChange} required/>
                </div>
                <div className="form-item">
                    <input type="text" placeholder="Enter Login"  name="login"  value = {data?.login} onChange={handleChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" placeholder="Enter Password"  name="password"  value = {data?.password} onChange={handleChange} required/>
                </div>
                <div className="form-item-other">
                    {emailSend && <p className='form-item-other-verification'>Before you login, please verify your email</p>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <div className="login-card-footer">
                Have an account? <Link className="login-card-link" to="/login">Login</Link>
            </div>
        </div>
    </div>
  );
}

export default Register;
