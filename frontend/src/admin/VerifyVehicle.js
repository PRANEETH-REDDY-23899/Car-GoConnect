import { Box, Button, Card, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import { Constants } from '../Constants'
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function VerifyVehicle() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (vehicle) => {
        setOpenedVehicle(vehicle)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openedVehicle, setOpenedVehicle] = useState({})

    const [vehicles, setvehicles] = useState([])
    const { SETERROR, SETSUCCESS, setSpin } = React.useContext(GlobalContext)
    useEffect(() => {
        setSpin(true)
        axios.get(Constants.END_POINT + "/allvehicles").then((res) => {
            console.log(res.data)
            setSpin(false)
            setvehicles(res.data)
        })
    }, [])

    return (
        <Box>
            <Grid container>
                {vehicles.map((vehicle) =>
                    <Grid item xs={12} sx={{ m: 2 }}>

                        <Card sx={{ p: 2, justifyContent: "space-between", display: "flex", alignItems: "center" }}>
                            <Box>

                                <Typography>{vehicle.Carname + "-" + vehicle.Carmodel}</Typography>
                                <Typography>{"status : " + vehicle.status}</Typography>
                            </Box>
                            <Button onClick={() => {
                                handleClickOpen(vehicle)
                            }} >view</Button>
                        </Card>

                    </Grid>
                )}


            </Grid>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            > 
            {Object.keys(openedVehicle).length!==0?
            <Box>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />

                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Admin
                        </Typography>

                        <Button variant='contained' autoFocus  sx={{ backgroundColor: "green" }} onClick={async ()=>{
                            if(openedVehicle.status !== "verified"){
                                
                                openedVehicle.status="verified"
                                await axios.post(Constants.END_POINT+"/updatevehicle",openedVehicle).then((res)=>{
                                    console.log(res)
                                    setOpenedVehicle({...openedVehicle,status:"verified"})
                                })
                            }
                        }} >{openedVehicle.status !== "verified" ? "Verify" : "verified"}</Button>

                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 2 }}>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }} >{"Carname: " + openedVehicle.Carname}</Typography>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }} >{"CarModel: " + openedVehicle.Carmodel}</Typography>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"License Number of car: " + openedVehicle.licensenumberofcar}</Typography>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"Year of model: " + openedVehicle.Yearofmodel}</Typography>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"Status : " + openedVehicle.status}</Typography>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"Status : " + openedVehicle.status}</Typography>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"Driverlicense"}</Typography>

                    <img src={openedVehicle.Driverlicense} style={{ width: 450, height: 200, marginTop: 10 }} />

                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"Proof Of Auto Insurance"}</Typography>

                    <img src={openedVehicle.Proofofautoinsurance} style={{ width: 450, height: 200, marginTop: 10 }} />


                    {openedVehicle.Financedocuments.length !== 0 ? <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"Finance Documents"}</Typography> : <></>}
                    {openedVehicle.Financedocuments.map((url) =>
                        <img src={url} style={{ width: 450, height: 200, marginTop: 10 }} />
                    )
                    }
                    {openedVehicle.CarImages.length !== 0 ? <Typography sx={{ fontWeight: "bold", mt: 1 }}>{"CarImages"}</Typography> : <></>}
                    {openedVehicle.CarImages.map((url) =>
                        <img src={url} style={{ width: 450, height: 200, marginTop: 10 }} />
                    )
                    }





                </Box>
                </Box>:<></>}
            </Dialog>
            
        </Box>
    )
}
