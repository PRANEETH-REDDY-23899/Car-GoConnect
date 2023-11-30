import { Button } from '@mui/material'
import React from 'react'

export default function ButtonCustom({text,mx,Click}) {
  return (
    <Button variant="contained"  sx={{px:1,my:2,mx:mx,py:1,backgroundColor:"#405DE6",':hover': { bgcolor: "#405DE6", color:'white'},fontWeight:"bold",boxShadow: 0,borderRadius:50,textTransform:"none"}} disableRipple={true} disableElevation onClick={()=>Click()}>
            {text}
    </Button>
  )
}
