import { useDispatch } from 'react-redux';
import './changePassword.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { changePasswordUtils } from '../../../../Components/utils/userUtils';

const initialData = {
    password: "",
    repeatPassword: ""
}

function ChangePassword(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [data,setData] = useState(initialData)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
          })
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        changePasswordUtils(data.password, dispatch, navigate)
    }
    return (
      <div className='changePasswordContainer'>
        <form method="post" className='changePasswordForm' onSubmit = {handleSubmit}>
            <h1 className='changePasswordHeader'>Change Password</h1>
            <input className='changePasswordInput' type='password' placeholder='Password' name='password' onChange = {handleChange}></input>
            <input className='changePasswordInput' type='password' placeholder='Repeat Password' name='repeatPassword' onChange = {handleChange}></input>
            <button className='changePasswordButton' type="submit" >Submit</button>
        </form>
      </div>
    );
  }
  
  export default ChangePassword;