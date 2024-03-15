import { useDispatch, useSelector } from 'react-redux';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import { logoutUtils } from '../../Components/utils/userUtils';

function Header(){

  const userName = useSelector((state: RootState )=> state.user.name)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async()=>{
    logoutUtils(dispatch,navigate)
  }

  return (
    <div className='headerContainer'>
      <Link to = '/' className='headerContainerLogo'>Chill</Link>
      <div className='headerContainerNickname'>hi {userName} !</div>
      <button className='headerContainerLogoutButton' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;