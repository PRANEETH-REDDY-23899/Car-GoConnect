import { Card, Divider } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breakpoints } from '../Components/Breakpoints'
import ButtonCustom from '../Components/ButtonCustom'
import CheckBoxCustom from '../Components/CheckBoxCustom'
import Error from '../Components/Error'
import ForgotPasswordText from '../Components/ForgotPasswordText'
import Input from '../Components/Input'
import Label from '../Components/Label'
import SubLabel from '../Components/SubLabel'
import { ToggleTrueFalse } from '../Functions/Common'
import { Signin } from '../Functions/Registration'
import { SignUpContext } from '../Context/SignupContext'
import { GlobalContext } from '../Context/GlobalContext'

export default function Fp() {

  const [Email, setEmail] = useState("")
  const [checked, setchecked] = useState(false)
  const [password, setpassword] = useState("")
  const [Err, setErr] = useState("")

  const {SigninData,setSigninData,setSignUpData,SignUpData}=useContext(SignUpContext)

  const {setSpin,SETSUCCESS,SETERROR} = useContext(GlobalContext)

  const navigate = useNavigate()

  return (
    <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: Breakpoints("100%", 370, 370, 370, 370, 370) }}>
      <Label text={"Forget Password"} mx={2}></Label>
      <SubLabel text={"Recover you password with email"} mx={2}></SubLabel>
      <Input placeholder={"Email"} mt={2} BorderColor={"black"} type="text" mx={2} state={Email} setstate={setEmail}></Input>
      <Error msg={Err} mb={1} mx={2}></Error>
      <ButtonCustom
        text={"Continue"}
        mx={2}
        Click={() => navigate("/newpassword")}
      >
      </ButtonCustom>
    </Card>
  )
}
