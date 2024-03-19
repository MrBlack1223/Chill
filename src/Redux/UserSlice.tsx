import {createSlice} from '@reduxjs/toolkit'
import { UserSliceState } from '../types'

const initialState: UserSliceState = {
    name: "",
    login: "",
    icon: "",
    email: "",
    friends: [""],
    verified: true,
    _id: "",
    friendsRequest: [""],
    connected: false,
    isPassTemporary: false
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state,actions) => {
        state.name = actions.payload.name
        state.login = actions.payload.login
        state.icon =  actions.payload.icon 
        state.email = actions.payload.email
        state.friends = actions.payload.friends
        state.friendsRequest = actions.payload.friendsRequest
        state.verified = actions.payload.verified
        state._id = actions.payload._id
        state.isPassTemporary = actions.payload.isPassTemporary
      },
      logout: (state) =>{
        state.name = initialState.name
        state.login = initialState.login
        state.icon = initialState.icon
        state.email = initialState.email
        state.friends = initialState.friends
        state.verified = initialState.verified
        state._id = initialState._id
        state.friendsRequest = initialState.friendsRequest
        state.isPassTemporary = initialState.isPassTemporary
      },
      setPassTemporary: (state,actions)=>{
        state.isPassTemporary = actions.payload
      },
      newFriendRequest: (state,actions)=>{
        state.friendsRequest.push(actions.payload)
      },
      friendRequestConsidered: (state,actions) =>{
        state.friendsRequest = state.friendsRequest.filter(el=>el!==actions.payload)
      }, 
      addFriend: (state,actions)=>{
        state.friends.push(actions.payload)
      },
      yourRequestIsAccepted: (state,actions)=>{
        state.friends.push(actions.payload)
      },
      removeFriend: (state,actions)=>{
        state.friends = state.friends.filter(el=> el !== actions.payload)
      },
      friendRemovedYou: (state,actions)=>{
        state.friends = state.friends.filter(el=> el !== actions.payload)
      },
      connectionEstablished: (state, actions)=>{
        state.connected = actions.payload
      },
      sendFriendRequest: (state,actions)=>{

      },
      connect: ()=>{

      }
    }
  })
  
  export const userActions = userSlice.actions;
  export const { login, connect, logout,setPassTemporary, newFriendRequest, friendRequestConsidered, addFriend, removeFriend, sendFriendRequest } = userSlice.actions
  export default userSlice.reducer