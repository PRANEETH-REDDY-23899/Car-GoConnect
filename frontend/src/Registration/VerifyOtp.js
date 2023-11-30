import { Box, Card } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Breakpoints } from '../Components/Breakpoints'
import ButtonCustom from '../Components/ButtonCustom'
import HeaderWIthLogo from '../Components/HeaderWIthLogo'
import Input from '../Components/Input'
import Label from '../Components/Label'
import { SendOtp } from '../Functions/Registration'
import { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import axios from 'axios'
import { PostSignupDetails, ReceiveCookie } from '../Functions/Common'
import { SignUpContext } from '../Context/SignupContext'
import { SignLanguage } from '@mui/icons-material'

export default function VerifyOtp() {
  const navigate=useNavigate()
  const [response, setresponse] = useState({})
  const [OtpEntered,setOtpEntered]=useState("")
  const {Spin,setSpin,SETSUCCESS,SETERROR}=useContext(GlobalContext)
  const {SigninData,setSigninData,setSignUpData,SignUpData}=useContext(SignUpContext)
 
  
  
  const SendotpToVerify = ()=> SendOtp(SignUpData.m===""?SigninData.m:SignUpData.m, setresponse,setSpin,SETSUCCESS,SETERROR)

  useEffect(() => {
    console.log(response,"came to use Effect")
    if(SignUpData.m==="" && SigninData.m===""){
      navigate("/sign-up")
    }else{
      SendotpToVerify()
    }
   
  }, [])

  return (
    <Box sx={{backgroundColor:"white",height:"100%"}}>
    <Container disableGutters={true} sx={{ backgroundColor: "white", px: "2.3%", pt: "20px"}}>
      <HeaderWIthLogo></HeaderWIthLogo>
      <Container disableGutters={true} sx={{ alignItems: 'center', display: "flex", height: "100%", flexDirection: "column", mt: "5%" }}>
        <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: Breakpoints("100%", 370, 370, 370, 370, 370) }}>
          <Label text={("Enter 4 digit otp sent to "+SignUpData.m+SigninData.m)} fs={16} mx={2}></Label>
          <Input placeholder={"Enter 4 digit otp"} mt={2} BorderColor={"black"} type="text" mx={2} state={OtpEntered} setstate={setOtpEntered}></Input>
          <ButtonCustom
            text={"Resend otp"}
            mx={2}
            Click={()=>
                SendOtp(SignUpData.m,setresponse,setSpin,SETSUCCESS,SETERROR)
             
            }
          ></ButtonCustom>
          <ButtonCustom
            text={"Verify Otp"}
            mx={2}
            Click={async ()=>{
                setSpin(true)
                console.log(response.otp,OtpEntered)
                if(response.otp===Number(OtpEntered)){
                  if(SignUpData.m!==""){
                   await PostSignupDetails({...SignUpData}).then((res)=>{
                    navigate("/")
                     setSpin(false)
                     SETSUCCESS("Successfully Created account")
                     console.log(res)
                     localStorage.setItem("jwt",res.data.token)
                     
                     navigate("/")

                   }).catch(()=>{
                    setSpin(false)
                    SETERROR("Unable to signup try again")
                   })
                  }else if (SigninData.m!==""){
                    await ReceiveCookie(SigninData.id).then((res)=>{
                      setSpin(false)
                      localStorage.setItem("jwt",res.data.token)
                      navigate('/')
                      SETSUCCESS("Successfully logged in")
                    }).catch(()=>{
                      setSpin(false)
                      SETERROR("unable to sign in Try again")
                    })
                  }
                }else{
                  setSpin(false)
                  SETERROR("Please Enter valid otp sent to mail")
                }
            }}
          ></ButtonCustom>

        </Card>
      </Container>
    </Container>
    </Box>
  )
}
