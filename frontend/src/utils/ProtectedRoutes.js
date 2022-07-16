import React from 'react'
import { Navigate } from "react-router-dom";

const AdminRoutes = ({isLoggedIn, isAdmin, children}) => {
    // let navigate = useNavigate()
    if(isLoggedIn && isAdmin){
        return children
    } else {
       return <Navigate to={"/"} replace />
    }
}

export default AdminRoutes