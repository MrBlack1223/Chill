import DisplayUser from '../../../../Components/onlineUsers/OnlineUsersComponents/displayUsers';
import { RootState } from '../../../../Redux/store';
import './friendReq.css';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { acceptRq, refuseRq} from '../../../../Components/utils/friendsUtils';

function FriendReq(){
  const friendsRequests = useSelector((state: RootState)=>state.user.friendsRequest)
  const dispatch = useDispatch()
  
  return (
    <div className='settingsContainer'>
      <h1 className='settingsContainerHeader'>Friend Requests</h1>
      {friendsRequests.map((request)=>{
        return  <DisplayUser  
                  friend = {request}
                  key={request} 
                  onlineUsers={[]} 
                  clickable = {false} 
                  btn1={<DoneIcon fontSize='large'/>} 
                  fn1={()=>acceptRq(request,dispatch)}
                  btn2={<HighlightOffIcon fontSize='large' />} 
                  fn2= {()=>refuseRq(request,dispatch)}
                />
      })}
    </div>
  );
}

export default FriendReq;