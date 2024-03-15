import React, { useState } from 'react';
import './input.css';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { sendMessageUtils } from '../../../Components/utils/utils';

function InputMessage(){
  
  const param = useLocation()
  const dispatch = useDispatch()
  const url = param.search.substring(1)

  const user = useSelector((state: RootState) => state.user._id)
  const conversation = useSelector((state: RootState) => state.chat.currentConv)
  const [message, setMessage] = useState('')

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    sendMessageUtils(url,message,user,conversation,dispatch)
    setMessage('')
  }

  return (
    <form className='inputMessageContainer' onSubmit={e => handleSubmit(e)}> 
      <div className='iconsContainer'></div>
      <input type='text' className='inputMessage' value = {message} onChange={(e)=>{setMessage(e.target.value)}}></input>
      <button className='sendMessageButton' type = 'submit' aria-label="Send message" ><SendIcon style={{ color: '#818181' }}/></button>
    </form>
  );
}

export default InputMessage;