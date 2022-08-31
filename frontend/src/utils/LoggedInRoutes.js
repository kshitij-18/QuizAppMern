import { CircularProgress } from '@mui/material'
import React from 'react'
import { Navigate, createSearchParams } from 'react-router-dom'

const LoggedInRoutes = ({isLoggedIn, user, children, url: urlFromProps}) => {
  if (isLoggedIn && !user){
    return <CircularProgress />
  } else if(isLoggedIn && user){
    return children
  } else {
    const params = {redirect: urlFromProps}
    const url = `/login?${createSearchParams(params)}`;
    return <Navigate to={url} replace />;
  }
}

export default LoggedInRoutes