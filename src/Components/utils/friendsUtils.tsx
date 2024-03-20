import axios from "axios"
import { AppDispatch } from "../../Redux/store"
import { addFriend, friendRequestConsidered, removeFriend, sendFriendRequest } from "../../Redux/UserSlice"
import { SERVER, errorMessage, showMessage } from "./utils"
import api from "./api"



export const acceptRq = async (friendRq: string, dispatch: AppDispatch)=>{
    try{
        const res = await api.get(`/user/friends/add/${friendRq}`,{withCredentials: true})
        if(res.status === 200){
          dispatch(friendRequestConsidered(friendRq))
          dispatch(addFriend(friendRq))
          showMessage('Friend request accepted')
        }
    }catch(err){
        if (axios.isAxiosError(err)) {
            errorMessage('Cant accept friend request')
            return ;
          }
        else{
            return
        }
    }
}

export const refuseRq = async (friendRq: string, dispatch: AppDispatch)=>{
    try{
        const res = await api.get(`/user/friends/declineRequest/${friendRq}`,{withCredentials: true})
        if(res.status === 200){
          dispatch(friendRequestConsidered(friendRq))
          showMessage('Friend request removed')
        }
    }catch(err){
        if (axios.isAxiosError(err)) {
            errorMessage('Cant decline friend request')
            return ;
          }
        else{
            return
        }
    }
}

export const sendRq = async(msg: string,id: string, dispatch: AppDispatch)=>{
    try{
        await api.get(`/user/friends/sendRequest/${id}`,{withCredentials:true})
        dispatch(sendFriendRequest(id))
        showMessage(msg)
    }catch(err){
        if (axios.isAxiosError(err)) {
            errorMessage('Cant send friend request')
            return ;
          }
        else{
            return
        }
    }
    
}

export const removeF = async (msg: string,id: string, dispatch: AppDispatch)=>{
    try{
        const res = await api.get(`/user/friends/remove/${id}`,{withCredentials:true})
        if(res.status === 200){
            showMessage(msg)
            dispatch(removeFriend(id))
        }
    }catch(err){
        if (axios.isAxiosError(err)) {
            errorMessage('Cant remove friend request')
            return ;
          }
        else{
            return
        }
    }
}
export const considerRequest = async(msg: string,id: string, dispatch: AppDispatch, userFriendRequests: string[])=>{
    if(msg === 'Request sent'){
        if(userFriendRequests.some(el=> el === id)){
            acceptRq(id,dispatch)
        }else{
            sendRq(msg,id,dispatch)
        }
    }else{
        removeF(msg,id,dispatch)
    }
}