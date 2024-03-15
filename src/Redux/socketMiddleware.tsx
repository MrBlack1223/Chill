import { Middleware } from "@reduxjs/toolkit";
import { userActions } from "./UserSlice";
import { chatActions } from "./chatSlice";
import { Socket, io } from "socket.io-client";

const socketMiddleware: Middleware = store => {
    let socket : Socket
    const isConnectionEstablished = store.getState().user.connected;
    return next => action =>{
        if(userActions.connect.match(action) && !isConnectionEstablished) {
            socket = io("wss://elemental-mud-pincushion.glitch.me")
            socket.on('connect', () => {
                store.dispatch(userActions.connectionEstablished(true));
                socket.emit("addUser",store.getState().user._id)
            })
            // Notifications
            socket.on('getFriendRequest',({from})=>{
                const firendRqArray = store.getState().user.friendsRequest as string[]
                const isAlredyRequested = firendRqArray.some((el) => el===from.userId)
                if(!isAlredyRequested && from.userId !== store.getState().user._id){
                    store.dispatch(userActions.newFriendRequest(from.userId))
                }
            })
            socket.on("yourRequestIsAccepted",({by})=>{
                if(by.userId !== store.getState().user._id){
                    store.dispatch(userActions.yourRequestIsAccepted(by.userId))
                }
            })
            socket.on("friendRemovedYou",({friend})=>{
                if(friend.uerId !== store.getState().user._id){
                    console.log(friend.userId)
                    store.dispatch(userActions.friendRemovedYou(friend.userId))
                }
            })
            // Set online users
            socket.on("sendOnlineUsers", ( users ) => {
                store.dispatch(chatActions.setOnlineUsers(users))
            })
            // Get msg
            socket.on("privateMessage", ({ text, from }) => {
                store.dispatch(chatActions.addMessageToArray({
                  _id: "",
                  receiverId: "",
                  senderId: from,
                  createdAt: "",
                  updatedAt: "", 
                  text: text
                }))
              })
            // Dsiconnect
            socket.on("disconnect",()=>{
                store.dispatch(userActions.connectionEstablished(false));
            })
        }
        // Logout
        else if(userActions.logout.match(action)){
                socket.disconnect()
        }
        // Friend Request
        else if(userActions.addFriend.match(action)){
            socket.emit('acceptFriendRequest',{
                rqSender: action.payload
            })
        }
        else if(userActions.removeFriend.match(action)){
            socket.emit("removeFriend",{
                who: action.payload
            })
        }
        else if(userActions.sendFriendRequest.match(action)){
            socket.emit("sendFriendRequest",{
                to: action.payload
            })
        }
        //Chat
        else if(chatActions.sendMessage.match(action)){
            socket.emit("privateMessage",{
                text: action.payload.text,
                to: action.payload.to
            })
        }
        next(action)
    }
}   
export default socketMiddleware
