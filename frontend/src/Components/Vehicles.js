import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Constants } from '../Constants'
import { Box, Card, Grid, Typography } from '@mui/material'
import { GlobalContext } from '../Context/GlobalContext'
import AddaRide from '../pages/AddaRide'
import Home from '../pages/Home'
import { useNavigate } from 'react-router-dom'

export default function Vehicles({ }) {

    const [vehicles, setvehicles] = useState([])
    const { SETERROR, SETSUCCESS, setSpin } = React.useContext(GlobalContext)
    const navigate = useNavigate()

    const token = localStorage.getItem("jwt")
    const [userid, setuserid] = React.useState("")
    const verifyuser = async () => {
      setSpin(true)
        const { data } = await axios.post(Constants.BACKEND_END_POINT + Constants.BACKEND_MIDDLE_POINT + "/VerifyUser",
            { jwt: token },
            {
                withCredentials: true,
            }
        );
        if (!data.status) {
            localStorage.removeItem("jwt")
            setSpin(false)
            navigate("/log-in");
        } else {

            axios.get(Constants.END_POINT + "/Vehicles/" + data.id).then((res) => {
                setSpin(false)
                console.log(res.data)
                setvehicles(res.data)
            })
        }
    }

    React.useEffect(() => {

        if (token !== null) {
            verifyuser()
        } else {
            navigate("/log-in")
        }
    }, [])

   

    return (
        <Box>

            <Grid container sx={{ p: 2 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {vehicles.map((vehicle, index) =>
                    <Grid xs={2} sm={4} md={4} sx={{ p: 2 }} key={index}>
                        <Card sx={{ p: 2 }}>
                            <Typography>{vehicle.Carname + "-" + vehicle.Carmodel}</Typography>
                            <Typography>{"status : " + vehicle.status}</Typography>
                        </Card>
                    </Grid>
                )}
            </Grid>

           

        </Box>
    )
}
