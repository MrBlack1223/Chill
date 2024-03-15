import './searchFriends.css';
import { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';
import 'react-toastify/dist/ReactToastify.css';
import useLoadData from '../../../../Components/hooks/useLoadData';
import DisplayUser from '../../../../Components/onlineUsers/OnlineUsersComponents/displayUsers';
import { considerRequest } from '../../../../Components/utils/friendsUtils';

function SearchFriends(){
    const dispatch = useDispatch()

    const [query,setQuery] = useState<string>('')
    const userFriends = useSelector((state: RootState) => state.user.friends)
    const userFriendRequests = useSelector((state:RootState)=> state.user.friendsRequest)

    const friends = useLoadData<[string]>(`/user/findByName?q=${query}`,{withCredentials:true},query.length > 2,[''],[query]).data
    
  return (
    <div className='homepageSearchContainer'>
      <input className = 'homepageSearchContainerInput' type = 'text' placeholder='Search friend' value = {query} onChange={(e)=>{setQuery(e.target.value)}}></input>
      {
        friends[0] ?
        friends.map((friend)=>{
            const isAlredyFriend = userFriends.some(el => el === friend)
            return <DisplayUser
                friend={friend}
                onlineUsers={[]}
                key={friend}
                clickable={false}
                btn1={isAlredyFriend ? <DoNotDisturbAltIcon fontSize='large'/> : <PersonAddIcon fontSize='large'/>}
                fn1={isAlredyFriend  ? ()=>{considerRequest("Friend removed",friend,dispatch,userFriendRequests)} : ()=>considerRequest("Request sent",friend,dispatch,userFriendRequests)}
            />
        }) : 
        <div className='findNewFriend'>You can search friends here</div>
      }
      </div>
  );
}

export default SearchFriends;