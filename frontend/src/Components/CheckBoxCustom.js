
import { Box, Checkbox, IconButton, Typography } from '@mui/material'
import React from 'react'

export default function CheckBoxCustom({checked,text,onChangeChecked}) {
 
  return (
        <IconButton sx={{mx:2,mt:2,alignItems:"flex-start",justifyContent:"flex-start",p:0}} onClick={onChangeChecked} disableRipple={true}>
          <Checkbox 
            sx={{m:0,p:0}}
            checked={checked}
            onChange={onChangeChecked}
          ></Checkbox>
          <Typography sx={{ml:0.5,fontWeight:"500"}}>{text}</Typography>
       </IconButton>

  )
}
