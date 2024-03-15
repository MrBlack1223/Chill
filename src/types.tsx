import { Socket } from "socket.io-client"

export interface UserSliceState{
    name: string,
    login: string,
    icon: string,
    email: string,
    friends: string[],
    friendsRequest: string[],
    verified: boolean,
    _id: string,
    connected?: boolean,
    isPassTemporary: boolean
}
export type ChatSlice = {
    onlineUsers: onlineUser[],
    messagesArray: ChatMessage[],
    currentConv: string
}
export type RegisterData = {
    name: string,
    login: string,
    email: string,
    password: string
  }
export type LoginCredentials ={
    email: string,
    password: string
}
export type ChatFriend = {
    name: string,
    icon: string,
    active: boolean
}
export type ChatMessage = {
    _id: string,
    text: string,
    receiverId: string,
    senderId: string,
    createdAt: string,
    updatedAt: string,
}
export type ChatHeaderProps = {
    friend: ChatFriend
}
export type ChatInputMessageProps = {
    socket: Socket
}
export type onlineUser = {
    socketId: string,
    userId: string,
}
export type message = {
    _id: string,
    senderId: string,
    receiverId: string,
    conversationId: string,
    text: string,
    createdAt: string,
    updatedAt: string
}
export type DisplayUsersProps = {
    friend: string,
    onlineUsers?: onlineUser[],
    clickable?: boolean,
    btn1?: any,
    fn1?: any,
    btn2?: any,
    fn2?: any,
}