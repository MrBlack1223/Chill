import './chatHeader.css';
import {ChatHeaderProps} from '../../../types';

function ChatHeader({friend} : ChatHeaderProps){
  const icon = friend.icon ? friend.icon : 'https://cdn.pixabay.com/photo/2023/09/24/14/05/dog-8272860_1280.jpg'
  return (
    <div className='chatHeaderContainer'> 
      <img src = {icon} alt="" className={friend.active ? 'activeHeaderUsericon':'headerUsericon'}></img>
      <div className='headerUsername'>{friend.name}</div>
    </div>
  );
}

export default ChatHeader;