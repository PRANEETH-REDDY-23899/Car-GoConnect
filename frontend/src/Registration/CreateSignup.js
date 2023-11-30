import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderWIthLogo from '../Components/HeaderWIthLogo'
import SignUp from '../PageComponents/SignUp'
import { useCookies } from "react-cookie";
import axios from 'axios'
import { Constants } from '../Constants'


export default function CreateSignup() {

  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate()

  const token = localStorage.getItem("jwt")
  const [userid, setuserid] = React.useState("")
  const verifyuser = async () => {
    
    const { data } = await axios.post(Constants.BACKEND_END_POINT + Constants.BACKEND_MIDDLE_POINT + "/VerifyUser",
      { jwt: token },
      {
        withCredentials: true,
      }
    );
    if (!data.status) {
      localStorage.removeItem("jwt")
      
      navigate("/log-in");
    } else {

        navigate("/")
    }
  }
  React.useEffect(() => {

    if (token !== null) {
      verifyuser()
    } 
  }, [])
  return (
    <Box sx={{backgroundColor:"white",height:"100%"}}>
    <Container disableGutters={true} sx={{backgroundColor:"white",px:"2.3%",pt:"20px",height:"100%",overflow:"hidden",width:'100%'}}>
        <HeaderWIthLogo></HeaderWIthLogo>
        <Container  disableGutters={true} sx={{alignItems:'center',display:"flex",height:"100%", flexDirection: "column",mt:"5%"}}>
          <SignUp></SignUp>
          <Typography sx={{mt:3,fontWeight:"bold",color:"blue"}}>Already have an account? <Link style={{textDecoration:"none"}} to="/log-in">Signin</Link></Typography>
        </Container>
    </Container>
    </Box>
  )
}