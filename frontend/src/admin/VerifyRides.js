import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import axios from 'axios'
import { Constants } from '../Constants'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'


export default function VerifyRides() {
  const navigate = useNavigate()
  const [Rides, setRides] = useState({})
    const { SETERROR, SETSUCCESS, setSpin } = React.useContext(GlobalContext)
    const [Vehicles,setVehicles]=useState([])
    useEffect( () => {
        setSpin(true)
       axios.get(Constants.END_POINT + "/Allrides").then((res) => {
            setSpin(false)
            console.log(res.data)
            setRides(res.data)
        })
    }, [])

  return (
    <Box>
    {Object.keys(Rides).length!==0?
    <Grid container sx={{p:2}}>
   
        {Rides.Rides.map((ride,index)=>
          <Grid item xs={12} sx={{p:1}} >
                <Card variant='elevation' sx={{display:"flex",p:1}} >
                    <Box>
                        <img style={{width:100,height:100}} src={Rides.vehicles[index]["CarImages"][0]}></img>
                    </Box> 
                    <Box sx={{ml:5}}>
                         <Typography sx={{fontWeight:"bold"}}>{ride.From + " - " + ride.To } </Typography>
                         <Typography  sx={{fontWeight:"500" ,fontSize:"14px"}} >{"Members : "+ride.Members} </Typography>
                         <Typography sx={{fontWeight:"500" ,fontSize:"14px"}}>{moment(ride.Date).format("DD,MMM YYYY") } </Typography>
                         <Typography  sx={{fontWeight:"500" ,fontSize:"14px"}} >{ride.time} </Typography>
                         
                    </Box>

                    <Box sx={{ml:5}}>
                      
                         <Typography sx={{textTransform:"capitalize",fontWeight:"bold",color:"blue"}} >{ride.status}</Typography>
                         <Button sx={{mt:2}} variant='outlined' onClick={async ()=>{
                             ride.status="verified"
                             await axios.post(Constants.END_POINT+"/verifyrides",ride).then((res)=>{
                              SETSUCCESS("Successfully deleted")
                              navigate(0)
                             })
                         }} >Verify Ride</Button>
                    </Box>

                </Card>
          </Grid>

        )}

    </Grid>
    :<></>}
    </Box>
  )
}
