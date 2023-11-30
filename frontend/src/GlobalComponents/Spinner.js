import React, { useContext } from 'react'
import '../Spin.css'
import { Box } from '@mui/material'
import { GlobalContext } from '../Context/GlobalContext'
export default function Spinner() {
  
    const {Loader,setLoader} = useContext(GlobalContext)
    return (
        <Box sx={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", display: Loader?"flex":"none",backgroundColor:"#f2f2f2"}}>
            <div className="sk-circle" >
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
            </div>
        </Box>
    )
}
