import { Card, Divider, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breakpoints } from '../Components/Breakpoints'
import ButtonCustom from '../Components/ButtonCustom'
import CheckBoxCustom from '../Components/CheckBoxCustom'
import Error from '../Components/Error'
import ForgotPasswordText from '../Components/ForgotPasswordText'
import Input from '../Components/Input'
import Label from '../Components/Label'
import LinkText from '../Components/LinkText'
import SubLabel from '../Components/SubLabel'
import { AgreeAndJoin, Signin } from '../Functions/Registration'
import { SignUpContext } from '../Context/SignupContext'
import { GlobalContext } from '../Context/GlobalContext'

export default function SignUp() {
  const [Email, setEmail] = useState("")

  const [password, setpassword] = useState("")
  const [Err, setErr] = useState("")

  const navigate = useNavigate()
  const {setSignUpData,SignUpData}=useContext(SignUpContext)
  const {ERROR,SETERROR} =React.useContext(GlobalContext)


  return (
    <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: Breakpoints("100%", 370, 370, 370, 370, 370) }}>
      <Label text={"Sign up"} mx={2}></Label>
      <SubLabel text={"Create your account to start receiving offers"} mx={2}></SubLabel>
      <Input placeholder={"Email"} mt={2} BorderColor={"black"} type="text" mx={2} state={Email} setstate={setEmail}></Input>
      <Error msg={Err} mb={1} mx={2.5}></Error>
      <Input placeholder={"Password"} BorderColor={"black"} mt={2} type="password" mx={2}  state={password} setstate={setpassword}></Input>
      {/* <Error msg={true?"Coundn't Find the Car-Go ConnectCar-Go Connect account associated with this email":""} mb={1} mx={2}></Error> */}
      <Typography sx={{fontSize:12,fontWeight:"500",mx:2,mt:1,alignSelf:"center",textAlign:"center"}}>By clicking "Accept & Join", you agree to Car-Go Connect <LinkText text={"Terms of Use"}></LinkText> , <LinkText text={"privacy policy"}></LinkText> , and <LinkText text={"Cookie Policy"}></LinkText> . </Typography>
      <ButtonCustom
        text={"Accept & Join"}
        mx={2}
        Click={() => AgreeAndJoin(Email, password, setErr, navigate,setSignUpData,SignUpData)}
      >
      </ButtonCustom>
      <Divider sx={{ mx: 2 }}>or</Divider>
      <ButtonCustom text={"Signup with google"} mx={2}></ButtonCustom>
    </Card>
  )
}
