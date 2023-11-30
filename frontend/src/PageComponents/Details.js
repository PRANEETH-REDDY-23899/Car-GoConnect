import { Card, Divider, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breakpoints } from '../Components/Breakpoints'
import ButtonCustom from '../Components/ButtonCustom'
import CheckBoxCustom from '../Components/CheckBoxCustom'
import Error from '../Components/Error'
import ForgotPasswordText from '../Components/ForgotPasswordText'
import Input from '../Components/Input'
import Label from '../Components/Label'
import LinkText from '../Components/LinkText'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import SubLabel from '../Components/SubLabel'
import { AgreeAndJoin, CheckDetails, Signin } from '../Functions/Registration'
import { SignUpContext } from '../Context/SignupContext'

export default function Details() {

  const [Firstname, setFirstname] = useState("")

  const [Lastname, setLastname] = useState("")
  
  const [dob,setdob] = useState({})
  const [Err, setErr] = useState("")

  const navigate = useNavigate()

  const {SigninData,setSigninData,setSignUpData,SignUpData}=useContext(SignUpContext)



  return (
    <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: Breakpoints("100%", 370, 370, 370, 370, 370) }}>
      <Label text={"Enter Details"} mx={2}></Label>
      <Error msg={Err} mb={1} mx={2.5}></Error>
      <Input placeholder={"Firstname"} mt={2} BorderColor={"black"} type="text" mx={2} state={Firstname} setstate={setFirstname}></Input>
      
      <Input placeholder={"Lastname"} BorderColor={"black"} mt={2} type="text" mx={2}  state={Lastname} setstate={setLastname}></Input>
      {/* <Error msg={true?"Coundn't Find the Careersstudio account associated with this email":""} mb={1} mx={2}></Error> */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        
      <DatePicker sx={{px:2,my:2,mb:2}} slotProps={{ textField: { size: 'small' } }} value={dob} onChange={(v)=>{
          setdob(v)
      }} />
      </LocalizationProvider> */}
      <ButtonCustom
        text={"Continue"}
        mx={2}
        Click={() => CheckDetails(Firstname,Lastname,setErr,setSignUpData,SignUpData,navigate,SigninData,setSigninData)}
      >
      </ButtonCustom>
      
    </Card>
  )
}
