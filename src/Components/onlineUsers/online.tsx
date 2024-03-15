import './online.css';
import DisplayUsers from './OnlineUsersComponents/displayUsers';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';


function Online(){
  const friends = useSelector((state: RootState) => state.user.friends)

  return (
    <div className='onlineUsersContainer'> 
      {friends.map((friend: string)=>{
        return <DisplayUsers friend = {friend} key={friend}/>
      })}
    </div>
  );
}

export default Online;