import axios from "axios"
import { Constants } from "../Constants"

export const CheckForEmpty = (Field) => {
    return Field === ""
}

export const CheckForEmptyArray = (Array) => {
    return Array.length === 0
}

export const ToggleTrueFalse = (state, setstate) => {
    setstate(!state)
}

export const EmailValidate = (email) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return email.match(isValidEmail)
}

export const PasswordValidate = (password) => {
    return password.length >= 8
}

export const AxiosCallGet = async (method, url, param) => {

   await axios.get(Constants.BACKEND_END_POINT+Constants.BACKEND_MIDDLE_POINT + url +"/"+ param)

}
export const CheckUser = async (Email)=>{
    const IsUserAvailable =  await axios.get(Constants.END_POINT+Constants.MIDDLE_POINT+"/checkmail/"+Email)
    return IsUserAvailable
}
export const PostSignupDetails = async (data)=>{
    await axios.post(Constants.END_POINT+Constants.MIDDLE_POINT+"/userinfo",data,{withCredentials:true})
}
export const ReceiveCookie = async (id)=>{
    return await axios.post(Constants.END_POINT+Constants.MIDDLE_POINT+"/SendCookie",{id:id},{withCredentials:true})
}
