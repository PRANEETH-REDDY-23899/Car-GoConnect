import { Box,Typography } from '@mui/material'

import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordText({mx}) {

  return (
    <Box sx={{mx:mx,mt:1}}>
    <Link to="/forgotpassword" style={{textDecoration:"none"}}>
        <Typography color={"#0A66C2"} sx={{fontWeight:"bold"}}> Forgot Password? </Typography>
    </Link>
 </Box>
  )
}
