import './verifyEmail.css';
import {useLocation} from 'react-router-dom'
import {useState} from 'react'
import { ClipLoader } from 'react-spinners';
import {Link} from 'react-router-dom'
import api from '../../Components/utils/api';

function VerifyEmail(){
  
    const location = useLocation()

    const [succes,setSucces] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleVerify = async()=>{
        try{
            setIsLoading(true)
            await api.get(`${location.pathname}`,{withCredentials: true})
            setSucces(true)
            setIsLoading(false)
        }catch(e){
            setSucces(false)
            setIsLoading(false)
        }
        
    }   
    return (
      <div className='verificationContainer'>
        <ClipLoader
            color='#345e35'
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        {!succes && !isLoading && <> 
                        <h1 className='verificationHeader'> To verify your email please click button below </h1>
                        <button className = 'verificationButton' onClick = {handleVerify} >Verify</button>
                    </>
        }
        {succes && !isLoading &&  <div className='verificationInfoContainer'>
                <h1 className='verificationText'>Verification complited</h1>
                <Link className='verificationLink' to='/login'> Go back to login page</Link>  
            </div>}
      </div>
    );
}

export default VerifyEmail;