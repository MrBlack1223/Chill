import { useEffect, useRef } from 'react';
import './chatBody.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { format } from 'timeago.js';

function ChatBody(){

  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const array =  useSelector((state:RootState) => state.chat.messagesArray)
  const user = useSelector((state:RootState) => state.user._id)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [array]);
  
  return (
    <div className='chatBodyContainer'> 
      {array.map((item)=>{
        return <div className={user === item.senderId ? 'sendMessageContainer' : 'recievedMessageContainer'} id = {item._id}> 
          <div className={user === item.senderId  ? 'message' : 'receivedMessage'}>
              {item.text}
              <div className='recieveTime'>{format(item.createdAt)}</div>
          </div>
          
        </div>
      })}
       <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatBody;