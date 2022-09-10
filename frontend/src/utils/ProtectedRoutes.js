import React from 'react'
import { Navigate, createSearchParams } from "react-router-dom";
import {CircularProgress} from '@mui/material'
import {useSelector} from 'react-redux'

const AdminRoutes = ({children}) => {
    const {isAuth: isLoggedIn, user, loading} = useSelector(state => state.auth);
   if (loading){
    return <CircularProgress />
   } else if (isLoggedIn && user?.data?.isAdmin){
    return children;
   } else if(isLoggedIn && !user?.data?.isAdmin){
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