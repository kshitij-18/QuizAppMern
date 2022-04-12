import React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack';
import {useSelector} from 'react-redux'

const ShowAlert = () => {
  const alertState = useSelector(state => state.error)
  const {errors} = alertState
  return (
    <div>
        <Stack sx={{width:"100%"}} spacing={2}>
          {
            errors?.map(err => (
              <Alert key={err.id} severity={err.severity}>{err.error}</Alert>
            ))
          }
        </Stack>
    </div>
  )
}

export default ShowAlert