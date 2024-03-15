import { useEffect } from 'react';
import './chat.css';
import InputMessage from './chatComponents/inputMessage';
import ChatHeader from './chatComponents/chatHeader';
import ChatBody from './chatComponents/chatBody';
import { useLocation } from 'react-router-dom';
import { ChatFriend, message} from '../../types';
import { useDispatch } from 'react-redux';
import { setCurrentConv, setMessagesArray } from '../../Redux/chatSlice';
import useLoadData from '../../Components/hooks/useLoadData';

const initialFriend : ChatFriend = {
  name: '',
  icon: '',
  active: false
}
const initialMessageArray: [message] = [
  {
    _id: '',
    senderId: '',
    receiverId: '',
    conversationId: '',
    text: '',
    createdAt: '',
    updatedAt: ''
  }
]
function Chat(){
  const location = useLocation();
  const url = location.search.substring(1)
  
  const friend = useLoadData<ChatFriend>(`/user/find/${url}`,{withCredentials:true},url.length > 3,initialFriend, [url]).data
  const createConvResponse = useLoadData<string>(`/conversation/create/${url}`,{withCredentials:true},url.length > 2,'',[url]).data
  const messagesResponse = useLoadData<[message]>(`/message/${createConvResponse}`,{withCredentials:true},createConvResponse !== '',initialMessageArray,[createConvResponse]).data
  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setCurrentConv(createConvResponse))
  },[createConvResponse])

  useEffect(()=>{
    if(messagesResponse.length > 0){
      dispatch(setMessagesArray(messagesResponse))
    }
  },[messagesResponse])

  return (
    <div className='chatContainer'> 
      <ChatHeader friend = {friend }/>
      <ChatBody />
      <InputMessage />
    </div>
  );
}

export default Chat;