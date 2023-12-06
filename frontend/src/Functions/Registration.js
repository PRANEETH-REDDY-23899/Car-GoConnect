import axios from "axios";
import { Constants } from "../Constants";
import { CheckForEmpty, CheckUser, EmailValidate, PasswordValidate, PostSignupDetails, ReceiveCookie } from "./Common";
import { useContext } from "react";
import { SignUpContext } from "../Context/SignupContext";



export const Signin = async (Email,Password,Checked,Error,navigate,SigninData,setSigninData,setSignUpData,SignUpData,setSpin,SETERROR,SETSUCCESS)=>{
       console.log("came")
       setSpin(true)
        Error("")
        if(!CheckForEmpty(Email) && (!CheckForEmpty(Password) || Checked)){
            if(EmailValidate(Email)){
                await CheckUser(Email.toLowerCase()).then(async (IsUserAvailable)=>{
                    if(Checked){
                        if(IsUserAvailable.data.value){
                            setSignUpData({...SignUpData,m:""})
                            setSigninData({...SigninData,m:Email.toLowerCase(),id:IsUserAvailable.data.id})
                            navigate("/verify-otp")
                        }else{
                            Error("Couldn’t find a car-Go connect account associated with this email. Try again or create an account .")
                        }
    
                     }
                     else if(PasswordValidate(Password)){
                        console.log("password came")
                        if(IsUserAvailable.data.value){
                           if(Password===IsUserAvailable.data.p){
                              await ReceiveCookie(IsUserAvailable.data.id).then((res)=>{
                                console.log(res)
                                localStorage.setItem("jwt",res.data.token)
                                SETSUCCESS("Successfully logged in")
                                navigate(0)
                              }).catch((err)=>{
                                // console.log("unable to log in try again")
                                console.log(err)
                                SETERROR("unable to log in try again")
                              })
                           }else{
                            Error("Please Enter the Valid Mail and Password")
                           }
                        }else{
                            Error("Couldn’t find a Car-Go Connect account associated with this email. Try again or create an account .")
                        }
                         
                     }else{
                        Error("Password Should be atleast 8 Characters")
                     }
                }).catch(()=>{
                    Error("Couldn’t find a Car-Go Connect account associated with this email. Try again or create an account .")
                })
                 
                 
            }else{
                console.log("invalid")
                Error("Mail you have Entered is Invalid , Please Enter the mail own by you")
            }
        }else{
            console.log("required")
            Error("Email and password (or check otp) are required to signin")
        }
        setSpin(false)
}

export const AgreeAndJoin = async (Email,Password,Error,navigate,setSignUpData,SignUpData)=>{ 
    console.log(Email,Password)
   
    if(!CheckForEmpty(Email) && !CheckForEmpty(Password)){
        
        if(EmailValidate(Email)){
            await CheckUser(Email.toLowerCase()).then(async (IsUserAvailable)=>{
                if(IsUserAvailable.data.value){
                    Error("Mail is already registered with carbooking")
                }else{
                    if(PasswordValidate(Password)){
                        setSignUpData({...SignUpData,m:Email.toLowerCase(),p:Password})
                        navigate("/location")
                    }else{
                        Error("Password Should be atleast 8 Characters")
                    }
                }
             }).catch(()=>{
                Error("Error while signing up Try again")
             })
             
        }
        else{
            Error("Mail you have Entered is Invalid , Please Enter the mail own by you")
        }

    }
    else{
        Error("Email and password are required")  
    }


}
export const ForgetPassword = async (otp,password,Error,Sentotp)=>{

    if(!CheckForEmpty(password) && !CheckForEmpty(otp)){
        if(otp===Number(Sentotp)){
            console.log("otp verified")
        }
    }else{
        Error("Password and otp are required fields")
    }
    
}
export const SendOtp =  async (email,setresponse,setSpin,SETSUCCESS,SETERROR)=>{
    setSpin(true)
    await axios.post(Constants.END_POINT+Constants.MIDDLE_POINT+"/verifyotp",{mail:email})
    .then((res)=>{
        setresponse(res.data)
        setSpin(false)
        SETSUCCESS("Otp sent successfully")
        return res.data
    }).catch((err)=>{
        setSpin(false)
        SETERROR("unable to sent otp try again")
        return err
    })
}


export const CheckLocation = (Location,Error,navigate,setSignUpData,SignUpData)=>{
   
    if(Location===null){
        Error("Please Select The Location")
    }else{
        setSignUpData({...SignUpData,l:Location.description})
        navigate("/enter-details")
    }
}
export const CheckDetails = async (FirstName,LastName,setErr,setSignUpData,SignUpData,navigate,SigninData,setSigninData)=>{
     console.log("clicked")
     setErr("")
    if(!CheckForEmpty(FirstName) && !CheckForEmpty(LastName) ){

        setSignUpData({...SignUpData,fn:FirstName,ln:LastName})
        setSigninData({...SigninData,m:""})
        navigate("/verify-otp")
      
    }else{
        setErr("Firstname and Lastname are required")
    }


}