import './mainChatPage.css';
import Online from '../../Components/onlineUsers/online';
import Chat from './chat';

function MainChat(){
  
  return (
    <div>
      <Online />
      <Chat />
    </div>
  );
}

export default MainChat;