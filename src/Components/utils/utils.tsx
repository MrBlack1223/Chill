import axios from 'axios';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../Redux/store';
import { sendMessage } from '../../Redux/chatSlice';
import { NavigateFunction } from 'react-router-dom';
import api from './api';

export const SERVER = "http://localhost:5000"

export const showMessage = (msg: string) =>{
    toast.success(msg,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
}

export const errorMessage = (msg: string)=>{
    toast.error(msg,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
}
export const chatNav = (friend: string, navigate: NavigateFunction)=>{
  navigate(`/chat?${friend}`)
}
export const sendMessageUtils = async (url: string, message: string, user: string, conversation: string, dispatch: AppDispatch)=>{
    try {
        await api.post(`/message/send/${url}/${conversation}`,{
        text: message
      }, {
        withCredentials: true
      })
      dispatch(sendMessage({
        _id: "",
        receiverId: "",
        senderId: user,
        createdAt: "",
        updatedAt: "", 
        text: message,
        to: url
      }))
    } catch (error) {
      errorMessage("Can't send message")
    }
}
