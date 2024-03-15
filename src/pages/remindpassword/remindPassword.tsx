import { useState } from 'react';
import './remindPassword.css';
import { Link } from 'react-router-dom';
import { remindPasswordUtils } from '../../Components/utils/userUtils';

function Remindpassword(){
    const [email,setEmail] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        remindPasswordUtils(email)
    }
    return (
      <div className='remindPasswordContainer'>

          <form className='remindPasswordForm' onSubmit = {handleSubmit}>
              <h1 className='remindPasswordHeader'>Remind your password</h1>
              <input className='remindPasswordInput' type='email' required placeholder='Enter your email' value = {email} onChange={handleChange}></input>
              <div className='remindPasswordMessageContainer'>
                <Link className="login-card-link" to="/login">Go to login page</Link>
              </div>
              <button className='remindPasswordButton' type='submit'>Remind</button>
          </form>

      </div>
    );
}

export default Remindpassword;