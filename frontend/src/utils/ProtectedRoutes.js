import React from 'react'
import { Navigate, createSearchParams } from "react-router-dom";
import {CircularProgress} from '@mui/material'

const AdminRoutes = ({isLoggedIn, user: userFromProps, children}) => {
   if (isLoggedIn && !userFromProps){
    return <CircularProgress />
   } else if (isLoggedIn && userFromProps.data.isAdmin){
    return children;
   } else if(isLoggedIn && !userFromProps.data.isAdmin){
    return <Navigate to='/' state = {
        {
            message:'Not authorized there',
            severity:'error'
        }
    } />
   } else {
    const params = {redirect:'/admin/addQuiz'};
    const url = `/login?${createSearchParams(params)}`;
    return <Navigate to={url} replace />
   }
}

export default AdminRoutes