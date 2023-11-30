import { Box, Container, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import HeaderWIthLogo from '../Components/HeaderWIthLogo'
import FreeSolo from '../Components/LocationCustom'
import Details from '../PageComponents/Details'
import SignUp from '../PageComponents/SignUp'
import { SignUpContext } from '../Context/SignupContext'

export default function Location() {

  const location = useLocation()
  const navigate = useNavigate()
  const {setSignUpData,SignUpData}=useContext(SignUpContext)
    
  
  useEffect(()=>{
    if(SignUpData.m==="" || SignUpData.p===""){
        navigate("/sign-up")
    }

  },[])

  

  return (
    <Box sx={{backgroundColor:"white",height:"100%"}}>
    <Container disableGutters={true} sx={{backgroundColor:"white",px:"2.3%",pt:"20px"}}>
        <HeaderWIthLogo></HeaderWIthLogo>
        <Container  disableGutters={true} sx={{alignItems:'center',display:"flex",height:"100%", flexDirection: "column",mt:"5%"}}>
           <FreeSolo></FreeSolo>
        </Container>
    </Container>
  </Box>
  )
}