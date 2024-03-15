import DisplayUser from '../../../../Components/onlineUsers/OnlineUsersComponents/displayUsers';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { RootState } from '../../../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import './friendList.css';
import { considerRequest,  } from '../../../../Components/utils/friendsUtils';
import { useNavigate } from 'react-router-dom';
import { chatNav } from '../../../../Components/utils/utils';

function Firiendlist(){
  const friends = useSelector((state: RootState)=>state.user.friends)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  return (
    <div className='suggestedFriendsContainer'>
      <h1 className='suggestedFriendsHeader'>Friends</h1>
      {friends.map((friend)=>{
        return <DisplayUser
                friend = {friend}
                key ={friend}
                clickable = {false}
                btn1={<DoNotDisturbAltIcon fontSize='large'/>}
                fn1={()=>{considerRequest("Friend Removed", friend, dispatch, friends)}}
                btn2={<ChatBubbleIcon fontSize='large'/>}
                fn2={()=>{chatNav(friend, navigate)}}
                />
      })}
    </div>
  );
}

export default Firiendlist;