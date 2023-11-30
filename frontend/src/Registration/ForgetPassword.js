import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderWIthLogo from '../Components/HeaderWIthLogo'
import Login from '../PageComponents/Login'
import { useCookies } from "react-cookie";
import Fp from '../PageComponents/Fp'


export default function CreateAccount() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      if(cookies.jwt){
        navigate("/")
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
  return (
    <Box sx={{backgroundColor:"white",height:"100%"}}>
    <Container disableGutters={true} sx={{backgroundColor:"white",px:"2.3%",pt:"20px",height:"100%",overflow:"hidden"}}>
        <HeaderWIthLogo></HeaderWIthLogo>
        <Container  disableGutters={true} sx={{alignItems:'center',display:"flex",height:"100%", flexDirection: "column",mt:"5%"}}>
          <Fp/>
          
        </Container>
    </Container>
    </Box>
  )
}
