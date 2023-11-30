
import { IconButton, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'

import { useNavigate } from "react-router-dom";


export default function HeaderIcon({Icon,text,active,setactive}) {

    
    const navigation = useNavigate();

    const ClickOnIcon = ()=>{
      setactive(text)
       navigation("/")
        
    }
  return (
    <div style={{margin:0,paddingLeft:15,paddingRight:15,alignItems:"center",justifyContent:"center",borderBottom:text===active?"3px solid black":"",paddingTop:3,paddingBottom:3}}>
        <IconButton type="button" sx={{ color:'#00000099',display:"block",fontSize:'12px',margin:0,padding:0,alignItems:"center",justifyContent:"center"}} disableRipple={true} aria-label="search" onClick={()=>ClickOnIcon()} component={Link} to="/default">
                {Icon}
                <Typography sx={{fontSize:13,marginTop:0,padding:0,fontWeight:"bold"}}>{text}</Typography>
        </IconButton>   
    </div>
  )
}
