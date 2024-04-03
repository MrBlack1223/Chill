import axios from "axios"
import { AppDispatch } from "../../Redux/store"
import { connect, login, logout, setPassTemporary } from "../../Redux/UserSlice"
import { errorMessage, showMessage } from "./utils"
import { LoginCredentials, RegisterData } from "../../types"
import { NavigateFunction } from "react-router-dom"
import api from "./api"

export const logoutUtils = async(dispatch: AppDispatch, navigate: NavigateFunction)=>{
    try{
      const res = await api.get(`/user/logout`,{ withCredentials: true })
      if(res.status === 204){
        localStorage.removeItem("refreshToken")
        navigate('/login')
        dispatch(logout())
      }
    }catch(e){
      errorMessage("Can't logout")
    }
}

export const remindPasswordUtils = async (email: string)=>{
    try{
        const res = await api.post(`/user/remind`,{email: email})
        if(res.status === 200) {
            showMessage('Check your e-mail')
        }
    }catch(e){
        if(axios.isAxiosError(e)){
            if(e.response?.status === 401) {
                errorMessage("User with this e-mail doesn't exist")
            }
        }else{
            errorMessage("Can't remind password")
        }
    }
}
export const loginUtils = async(dispatch: AppDispatch, navigate: NavigateFunction, data: LoginCredentials,
     setEmailSend: React.Dispatch<React.SetStateAction<boolean>>, setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    try{
        setLoading(true)
        const res = await api.post(`/user/login`,data,{ withCredentials: true })
        localStorage.setItem("refreshToken",res.data.refreshToken)
        dispatch(login(res.data.user))
        dispatch(connect())
        setLoading(false)
        if(res.data.user.isPassTemporary) return navigate('/changePassword')
        if(res.status === 200) return navigate('/')
    }catch(err){
        if (axios.isAxiosError(err)) {
            if(err.response?.status === 400) setEmailSend(true)
            if(err.response?.status === 401) errorMessage("User doesn't exist")
            if(err.response?.status === 403) errorMessage("Wrong credentials")
                
            setLoading(false)
            return 
          }
        else{
            setLoading(false)
            return
        }
    }
}
export const changePasswordUtils = async(password: string, dispatch: AppDispatch, navigate: NavigateFunction) =>{
    try{
        if(password === password)
        {
            const res = await api.post(`/user/update/userPassword`,{password},{withCredentials:true})
            
            dispatch(setPassTemporary(false))
            navigate('/')
        }else{
            errorMessage('Password must be the same')
        }
    }catch(err){
        if (axios.isAxiosError(err)) {
            if(err.response?.status === 403) errorMessage("Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!")
            return 
        }else{
            errorMessage("Can't change password")
        }
    }
}
export const registerUtils = async(data:RegisterData, setEmailSend: React.Dispatch<React.SetStateAction<boolean>>, setData: React.Dispatch<React.SetStateAction<RegisterData>>,defaultData: RegisterData)=>{
    try{
        const res = await api.post(`/user`, data)
        if(res.status === 200) setEmailSend(true)
        setData(defaultData)
    }catch(err){
        if (axios.isAxiosError(err)) {
            errorMessage("Can't create this user")
            return ;
          }
        else{
            return
        }
    }
}
