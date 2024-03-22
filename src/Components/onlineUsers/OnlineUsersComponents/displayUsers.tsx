import './displayUsers.css';
import { Link } from 'react-router-dom';
import { ChatFriend, DisplayUsersProps } from '../../../types';
import useLoadData from '../../hooks/useLoadData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import UserLoader from './userLoader';

const defaultUser = {
  name: '',
  icon: '',
  active: false
}

function DisplayUsers( {friend, clickable = true, btn1, fn1, btn2, fn2} : DisplayUsersProps){
  
  const onlineUsers = useSelector((state: RootState)=>state.chat.onlineUsers)
  const {data:currentFriend,loading} = useLoadData<ChatFriend>(`/user/find/${friend}`,{withCredentials:true}, friend.length === 24, defaultUser, []) 
  const icon = currentFriend.icon ? currentFriend.icon : 'https://cdn.pixabay.com/photo/2023/09/24/14/05/dog-8272860_1280.jpg'
  
  return ( !loading ? ( clickable ? <Link className = "conversationLink" to = {`/chat?${friend}`}>
      <div className='userContainer' >
          <img src={icon} alt="Friend icon" className={`userPhoto ${onlineUsers.some(el=>el.userId===friend) ? 'online':''}`}/>
          <div className='userInfoContainer'>
              <p className='userName'>{currentFriend.name}</p>
          </div>
      </div>
    </Link>:
    <div className='userContainer' >
          <img src={icon} alt="Friend icon" className={`userPhoto ${onlineUsers.some(el=>el.userId===friend) ? 'online':''}`}/>
          <div className='userInfoContainer'>
              <p className='userName'>{currentFriend.name}</p>
          </div>
          <div className='displayUsersButtonsContainer'>
            {btn1 ? <button className='displayUsersListButton' onClick = {fn1} >{btn1}</button>:<></>}
            {btn2 ? <button className='displayUsersListButton' onClick = {fn2} >{btn2}</button>:<></>}
          </div>
    </div>) : 
    <UserLoader />
  );
}

export default DisplayUsers;