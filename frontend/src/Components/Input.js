import React, { useState } from 'react'
import InputBase from '@mui/material/InputBase';
import { IconButton, Typography } from '@mui/material';


export default function Input({ placeholder, mt, mb, BorderColor, type,mx,disabled=false,state,setstate}) {

  const [showPassword, setshowPassword] = useState(false)

  const ChangeHideorShow = () => {
    setshowPassword(!showPassword)
  }
  return (
    <InputBase
      size="small"
      value={state}
      disabled={disabled}
      type={type === "password" ? !showPassword ? "password" : "text" : "text"}
      variant="filled"
      sx={{ border: "1px solid " + BorderColor, px: 1, borderRadius: 1, py: type==="text"?0.7:0.1, mt: mt, mb: mb,mx:mx }}
      placeholder={placeholder}
      endAdornment={type === "password" ?
        <IconButton onClick={() => ChangeHideorShow()}>
          <Typography>{showPassword ? "Hide" : "Show"}</Typography>
        </IconButton> : ""
      }
      onChange={(e)=>{
        setstate(e.target.value)
      }}
      
    />
  )
}
