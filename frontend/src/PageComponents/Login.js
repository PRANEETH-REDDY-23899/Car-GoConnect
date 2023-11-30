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

export default function Login() {

  const [Email, setEmail] = useState("")
  const [checked, setchecked] = useState(false)
  const [password, setpassword] = useState("")
  const [Err, setErr] = useState("")

  const {SigninData,setSigninData,setSignUpData,SignUpData}=useContext(SignUpContext)

  const {setSpin,SETSUCCESS,SETERROR} = useContext(GlobalContext)

  const navigate = useNavigate()

  return (
    <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: Breakpoints("100%", 370, 370, 370, 370, 370) }}>
      <Label text={"Signin"} mx={2}></Label>
      <SubLabel text={"Stay connected with your profile"} mx={2}></SubLabel>
      <Input placeholder={"Email"} mt={2} BorderColor={"black"} type="text" mx={2} state={Email} setstate={setEmail}></Input>
      <Error msg={Err} mb={1} mx={2}></Error>
      <CheckBoxCustom
        checked={checked}
        text={"Signin with otp"}
        onChangeChecked={() => ToggleTrueFalse(checked, setchecked)}
      >
      </CheckBoxCustom>
      <Input placeholder={"Password"} BorderColor={"black"} mt={2} type="password" mx={2} disabled={checked} state={password} setstate={setpassword}></Input>
      {/* <Error msg={true?"Coundn't Find the Careersstudio account associated with this email":""} mb={1} mx={2}></Error> */}
      {/* <ForgotPasswordText mx={2}> </ForgotPasswordText> */}
      <ButtonCustom
        text={"Signin"}
        mx={2}
        Click={() => Signin(Email, password, checked, setErr, navigate,SigninData,setSigninData,setSignUpData,SignUpData,setSpin,SETERROR,SETSUCCESS)}
      >

      </ButtonCustom>
     
    </Card>
  )
}
