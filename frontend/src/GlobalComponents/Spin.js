import { Box, CircularProgress } from '@mui/material'
import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalContext'

export default function Spin() {
  const {Spin,setSpin} = useContext(GlobalContext)

  return (
    <Box sx={{ position: "absolute", display: Spin?"flex":"none", alignItems: "center", justifyContent: "center", width: "100%", height: "70%", zIndex: 100 }}>
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  )
}
