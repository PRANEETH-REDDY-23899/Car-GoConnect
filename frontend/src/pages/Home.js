import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Box, Button, ButtonGroup, Card, Grid, IconButton, InputBase, Modal, TextField, Typography } from '@mui/material'
import LocationAuto from '../Components/LocationAuto'
import AdjustIcon from '@mui/icons-material/Adjust';
import GroupIcon from '@mui/icons-material/Group';
import { Search } from '@mui/icons-material';
import Location from '../Components/Location';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import { Constants } from '../Constants';
import moment from 'moment';
import MessageIcon from '@mui/icons-material/Message';
import SingleChat from './SingleChat';



export default function Home() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [From, setFrom] = useState("")
    const [To, setTo] = useState("")
    const [members, setMembers] = useState(1)
    const [show, setshow] = useState(false)
    const [Date, setDate] = useState()

    const navigate = useNavigate()
    const [Rides, setRides] = useState({})
    const { SETERROR, SETSUCCESS, setSpin } = React.useContext(GlobalContext)
    const [receiverid,setreceiverid]=useState("")

    const [openchat, setopenchat] = React.useState(false);
    const token = localStorage.getItem("jwt")
    const [userid, setuserid] = React.useState("")
    const verifyuser = async () => {
        const { data } = await axios.post(Constants.BACKEND_END_POINT + Constants.BACKEND_MIDDLE_POINT + "/VerifyUser",
            { jwt: token },
            {
                withCredentials: true,
            }
        );
        if (!data.status) {
            localStorage.removeItem("jwt")
            navigate("/log-in");
        } else {
            setuserid(data.id)
        }
    }

    React.useEffect(() => {
        if (token !== null) {
            verifyuser()
        }
    }, [])
    const [Vehicles, setVehicles] = useState([])
    const getRides = async () => {
        setRides({})

        setSpin(true)
        await axios.post(Constants.END_POINT + "/searchrides", {
            From: From.description,
            To: To.description,
            Date: Date.$d,
            Members: members,
        }).then((res) => {
            setSpin(false)
            console.log(res.data)
            setRides(res.data)
        })
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 1
    };

    const BookRide = async (ride) => {
        setSpin(true)
        if (token !== null) {
            await verifyuser()
            await axios.post(Constants.END_POINT + "/BookRide", {
                userid: userid,
                publishid: ride._id
            }).then((res) => {
                if (res.data.value) {
                    SETERROR("Already booked")
                } else {
                    SETSUCCESS("Successfully Booked Ride")
                }
                setSpin(false)
    
    
            }).catch((err)=>{
                SETERROR("Network error")
                setSpin(false)
            })
        } else {
            navigate("/log-in")
            setSpin(false)
        }
        
        

    }

    return (
        <>
           {userid!==""? <SingleChat open={openchat} setopen={setopenchat} userid={receiverid} loggedinuser={userid} setloggedinuser={setreceiverid} />:<></>}
            <Card variant='elevation' sx={{ mt: 10, mx: 2 }} elevation={10}>
                <Grid container>
                    <Grid item md={3.5} xs={12} xxs={12} sx={{ width: "100%", height: 55, borderRight: { md: "1px solid black", xs: "", xxs: "" }, borderBottom: { md: "none", xs: "1px solid black", xxs: "1px solid black" } }}>
                        <Location placeholder="From" setValue={setFrom} />
                    </Grid>
                    <Grid item md={3.5} xs={12} xxs={12} sx={{ width: "100%", height: 55, borderRight: { md: "1px solid black", xs: "", xxs: "" }, borderBottom: { md: "none", xs: "1px solid black", xxs: "1px solid black" } }}>
                        <Location placeholder="To" setValue={setTo} />
                    </Grid>

                    <Grid item md={2} xs={12} xxs={12} sx={{ height: 55 }}>
                        <Box sx={{ display: "flex", width: "100%", alignItems: "center", height: "100%", borderRight: "1px solid black", px: 2, borderRight: { md: "1px solid black", xs: "", xxs: "" }, borderBottom: { md: "none", xs: "1px solid black", xxs: "1px solid black" } }}>
                            {/* <DatePicker disablePast sx={{width:'100%'}} /> */}

                            <DatePicker
                                sx={{ width: "100%" }}
                                format="DD MMM, YYYY"
                                views={['month', 'year', 'day']}
                                disablePast
                                value={Date}
                                onChange={(newValue) => {
                                    setDate(newValue)
                                }}
                                // remove slotProps to remove customization
                                slotProps={{
                                    inputAdornment: {
                                        position: 'start'
                                    },
                                    textField: {
                                        // onBeforeInput: onAnyTextFieldChanged, 
                                        InputProps: {
                                            size: 'medium',
                                            readOnly: true,
                                            disableUnderline: true,


                                        },
                                        sx: { width: "100%" },
                                        variant: 'standard'
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item md={1.5} xs={12} xxs={12} sx={{ height: 55 }} >

                        <Button sx={{ display: "flex", width: "100%", alignItems: "center", height: "100%", px: 2, justifyContent: "start" }} onClick={handleOpen}>
                            <GroupIcon />
                            <Typography sx={{ ml: 1 }}>{members}</Typography>
                        </Button>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                            <Card sx={style}>
                                <ButtonGroup size="small" aria-label="small outlined button group">
                                    <Button onClick={() => {
                                        if (members < 3) {
                                            setMembers(members + 1)
                                        }

                                    }} >+</Button>
                                    <Button disabled sx={{ width: "150px" }}>{members}</Button>
                                    <Button onClick={() => {
                                        if (members > 1) {
                                            setMembers(members - 1)
                                        }

                                    }} >-</Button>
                                </ButtonGroup>
                                <Box sx={{ justifyContent: "flex-end", display: "flex", mt: 2 }}>
                                    <Button onClick={() => {
                                        setOpen(false)
                                    }} >ok</Button>
                                </Box>

                            </Card>

                        </Modal>

                    </Grid>
                    <Grid item md={1.5} xs={12} xxs={12} sx={{ height: 55 }}>
                        <Button variant='contained' sx={{ width: "100%", height: "100%", fontWeight: "bold", textAlign: "start", borderRadius: 0 }} disableRipple={true} startIcon={<Search />} onClick={() => {
                            getRides()
                        }} > Search </Button>
                    </Grid>


                </Grid>


            </Card>

            <Grid sx={{ p: 0 }} >
                <Box>
                    {Object.keys(Rides).length !== 0 ?
                        <Grid container sx={{ p: 2 }}>
                            {Rides.Rides.map((ride, index) =>
                                <Grid item xs={12} sx={{ p: 1 }} >
                                    <Card variant='elevation' sx={{ display: "flex", p: 1 }} >
                                        <Box>
                                            <img style={{ width: 100, height: 100 }} src={Rides.vehicles[index]["CarImages"][0]}></img>
                                        </Box>
                                        <Box sx={{ ml: 5 }}>
                                            <Typography sx={{ fontWeight: "bold" }}>{ride.From + " - " + ride.To} </Typography>
                                            <Typography sx={{ fontWeight: "500", fontSize: "14px" }} >{"Members : " + ride.Members} </Typography>
                                            <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>{moment(ride.Date).format("DD,MMM YYYY")} </Typography>
                                            <Typography sx={{ fontWeight: "500", fontSize: "14px" }} >{ride.time} </Typography>

                                        </Box>

                                        <Box sx={{ ml: 5 }}>
                                        <Box sx={{display:"flex",alignItems:"center"}}>
                                            <Typography sx={{ textTransform: "capitalize", fontWeight: "bold", color: "blue" }} >{ride.status}</Typography>
                                            <IconButton sx={{ml:2}} onClick={()=>{
                                                setreceiverid(ride.UserId)
                                                setopenchat(true)
                                            }} >
                                                    <MessageIcon/>
                                            </IconButton>
                                            </Box>
                                            <Button sx={{ mt: 2 }} variant='outlined' onClick={async () => {
                                                BookRide(ride)
                                            }} >Book Ride</Button>


                                        </Box>

                                    </Card>
                                </Grid>

                            )}

                        </Grid>
                        : <></>}
                </Box>
            </Grid>
        </>
    )
}
