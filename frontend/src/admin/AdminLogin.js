import { Card, Container, Divider } from '@mui/material'
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
import { Constants } from '../Constants'
import axios from 'axios'

export default function AdminLogin() {

  const [Username, setUsername] = useState("")
  const [password, setpassword] = useState("")
  const [Err, setErr] = useState("")

  const {SigninData,setSigninData,setSignUpData,SignUpData}=useContext(SignUpContext)

  const {setSpin,SETSUCCESS,SETERROR} = useContext(GlobalContext)

  const navigate = useNavigate()

  return (
    <Container  disableGutters={true} sx={{alignItems:'center',display:"flex",height:"100%", flexDirection: "column",mt:"5%"}}>
    <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: Breakpoints("100%", 370, 370, 370, 370, 370) }}>
      <Label text={"Admin Signin"} mx={2}></Label>
      {/* <SubLabel text={"Stay connected with your profile"} mx={2}></SubLabel> */}
      <Input placeholder={"user name"} mt={2} BorderColor={"black"} type="text" mx={2} state={Username} setstate={setUsername}></Input>
      <Error msg={Err} mb={1} mx={2}></Error>
      {/* <CheckBoxCustom
        checked={checked}
        text={"Signin with otp"}
        onChangeChecked={() => ToggleTrueFalse(checked, setchecked)}
      >
      </CheckBoxCustom> */}
      
      <Input placeholder={"Password"} BorderColor={"black"} mt={2} type="password" mx={2} disabled={false} state={password} setstate={setpassword}></Input>
      {/* <Error msg={true?"Coundn't Find the Car-Go Connect account associated with this email":""} mb={1} mx={2}></Error> */}
      {/* <ForgotPasswordText mx={2}> </ForgotPasswordText> */}
      <ButtonCustom
        text={"Signin"}
        mx={2}
        Click={() =>{
            if(Username==="" || password===""){
                SETERROR("All Fields are requried")
            }else{
                
                axios.post(Constants.BACKEND_END_POINT+"/verifyadmin",{
                    username:Username,
                    p:password
                }).then((res)=>{
                    if(res.data.value){
                        localStorage.setItem("admin",true)
                        navigate("/admin")
                    }else{
                        SETERROR("invalid credentails")
                    }
                })
            
            }
        }  }
      >

      </ButtonCustom>
    </Card>
    </Container>
  )
}
