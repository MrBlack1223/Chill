import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "../../Redux/store"
import { ProtectectionComponentProps } from "../../types"
    
export const Protect = (props: ProtectectionComponentProps) =>{
    const user = useSelector((state:RootState) => state.user._id)
    if(user.length !== 24){
        return <Navigate to = {props.route} replace />
    }
    return props.child ? props.child : <Outlet />
}