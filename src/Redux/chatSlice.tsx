import {createSlice} from '@reduxjs/toolkit'
import { ChatSlice } from '../types'

const initialState: ChatSlice = {
    onlineUsers: [],
    messagesArray: [],
    currentConv: ''
  }

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
    //Set
      setMessagesArray: (state,actions)=>{
        state.messagesArray = actions.payload
      },
      setOnlineUsers: (state,actions)=>{
        state.onlineUsers = actions.payload
      },
      setCurrentConv: (state,actions)=>{
        state.currentConv = actions.payload
      },
    //Clear
      clearMessagesArray: (state)=>{
        state.messagesArray = initialState.messagesArray
      },
      clearOnlineUsers: (state)=>{
        state.onlineUsers = initialState.onlineUsers
      },
      clearCurrentConv: (state)=>{
        state.currentConv = initialState.currentConv
      },
    //ADD
      addMessageToArray: (state,action)=>{
        state.messagesArray.push(action.payload)
      },
      sendMessage: (state,action)=>{
        state.messagesArray.push(action.payload)
      },
      addOnlineUser: (state,action)=>{
        state.onlineUsers.push(action.payload)
      },
    //Remove
      removeMessageFromArray: (state,action)=>{
        state.messagesArray = state.messagesArray.filter(el=>el._id !== action.payload._id)
      },
      removeOnlineUser: (state,action)=>{
        state.onlineUsers = state.onlineUsers.filter(el=>el!==action.payload)
      }

    }
  })
  
  export const chatActions = chatSlice.actions;
  export const {setMessagesArray, setOnlineUsers, setCurrentConv, clearMessagesArray, clearOnlineUsers,
                clearCurrentConv, addMessageToArray, addOnlineUser, removeMessageFromArray, removeOnlineUser, sendMessage} = chatSlice.actions
  export default chatSlice.reducer