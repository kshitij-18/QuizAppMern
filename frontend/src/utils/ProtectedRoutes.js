import React from 'react'
import { Redirect } from "react-router-dom";

const ProtectedRoutes = ({isLoggedIn, children}) => {
    // let navigate = useNavigate()
    if(isLoggedIn){
        return children
    } else {
       <Redirect to={"/"} />
       return null
    }
}

export default ProtectedRoutes