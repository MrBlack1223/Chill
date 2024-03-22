import { Navigate, Outlet } from "react-router-dom"
import { ProtectectionComponentProps } from "../../types"
    
export const Protect = (props: ProtectectionComponentProps) =>{
    const isLoggedin = localStorage.getItem("refreshToken")
    if(!isLoggedin){
        return <Navigate to = {props.route} replace />
    }
    return props.child ? props.child : <Outlet />
}