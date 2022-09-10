import { CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, createSearchParams } from 'react-router-dom'

const LoggedInRoutes = ({children, url: urlFromProps}) => {
  const {isAuth: isLoggedIn, user, loading} = useSelector(state => state.auth);
  if (loading){
    return <CircularProgress />
  } else if(isLoggedIn && user){
    return children
  } else {
    const data = {isLoggedIn, user, urlFromProps}
    console.table(data)
    const params = {redirect: urlFromProps}
    const url = `/login?${createSearchParams(params)}`;
    return <Navigate to={url} replace />;
  }
}

export default LoggedInRoutes