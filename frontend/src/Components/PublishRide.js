import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { Constants } from '../Constants'
import { Box, Button, ButtonGroup, Card, Grid, InputBase, Modal, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { GlobalContext } from '../Context/GlobalContext';
import LocationAuto from '../Components/LocationAuto'
import AdjustIcon from '@mui/icons-material/Adjust';
import GroupIcon from '@mui/icons-material/Group';
import { Search } from '@mui/icons-material';
import Location from '../Components/Location';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from 'react-router-dom';
import Vehicles from './Vehicles';

export default function PublishRide() {

    const { SETERROR, SETSUCCESS, setSpin } = React.useContext(GlobalContext)
    const [vehicles, setvehicles] = useState([])



    const [Publish, setPublish] = useState({
        vehicleid: "",
        userId:"",
        From: "",
        To: "",
        Date: "",
        Members: "",
        status: "",
        price:""
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const [From, setFrom] = useState("")
    const [To, setTo] = useState("")
    const [members, setMembers] = useState(1)
    const [show, setshow] = useState(false)
    const [Date, setDate] = useState("")
    const [time,settime]=useState("")
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
   

    const PublishNewRide = async () =>{
        setSpin(true)
        if(Publish.vehicleid==="" || From==="" || To==="" || Date==="" || time===""  || Publish.price===""){
            SETERROR("All Fields are Requried to publish (check vechicle is add and verified))")
            setSpin(false)
        }else{
            const arr=Publish.vehicleid.split(":")
            await axios.post(Constants.END_POINT+"/publishride",{
                vehicleid:arr[0],
                From:From.description,
                To:To.description,
                Date:Date.$d,
                Members:Number(members),
                status:"under process",
                time:time,
                UserId:arr[1],
                price:Publish.price
            }).then(()=>{
                setSpin(false)
                navigate('/addedrides')
                SETSUCCESS("Ride published successfully")
            }).catch(err=>{
                setSpin(false)
            })
        }
    }


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

            axios.get(Constants.END_POINT + "/verifiedVehicles/" + data.id).then((res) => {
                console.log(res.data)
                setSpin(false)
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
        {Vehicles.length!==0?
        <Box >
             
            <Grid container >
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Select Vehicle*</FormLabel>
                    <RadioGroup
                        onChange={(e, v) => {
                            setPublish({ ...Publish, vehicleid: v })
                        }}
                    >
                        {vehicles.map((vehicle, index) =>
                            <Grid xs={12} sm={12} md={12} sx={{ p: 2 }} key={index}>
                                <FormControlLabel value={vehicle._id +  ":" + vehicle.userId} control={<Radio />} label={
                                    <Card sx={{ p: 2 }}>
                                        <Typography>{vehicle.Carname + "-" + vehicle.Carmodel}</Typography>
                                        <Typography>{"status : " + vehicle.status}</Typography>
                                    </Card>
                                } />
                            </Grid>
                        )}




                    </RadioGroup>
                </FormControl>
            </Grid>

        
                <Card variant='elevation' sx={{ mt: 0, mx: 2 }} elevation={10}>
                    <Grid container>
                        <Grid item md={3.5} xs={12} xxs={12} sx={{ width: "100%", height: 55, borderRight: { md: "1px solid black", xs: "", xxs: "" }, borderBottom: { md: "none", xs: "1px solid black", xxs: "1px solid black" } }}>
                            <Location placeholder="From" setValue={setFrom} />
                        </Grid>
                        <Grid item md={3.5} xs={12} xxs={12} sx={{ width: "100%", height: 55, borderRight: { md: "1px solid black", xs: "", xxs: "" }, borderBottom: { md: "none", xs: "1px solid black", xxs: "1px solid black" } }}>
                            <Location placeholder="To" setValue={setTo} />
                        </Grid>

                        <Grid item md={3} xs={12} xxs={12} sx={{ height: 55 }}>
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



                    </Grid>


                </Card>
                <Grid sx={{ height: 55, mt: 4,pl:2 }}>
                   
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="time picker" onChange={(v)=>{
                                settime(v.$H+":"+v.$m)
                            }} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>


                <Grid sx={{ height: 55, mt: 4,pl:2 }}>
                   
                    <InputBase sx={{width:"100%",border:"1px solid black",borderRadius:2,px:2}} placeholder='price in $' type='number' value={Publish.price} onChange={(e)=>{
                        setPublish({...Publish,price:e.target.value})
                    }}  ></InputBase>
                </Grid>

                <Grid sx={{ height: 55, mt: 4 }}>
                    <Button variant='contained' sx={{ width: "100%", height: "100%", fontWeight: "bold", textAlign: "start", borderRadius: 0 }} disableRipple={true} onClick={() => {
                        PublishNewRide()
                    }} > Submit </Button>
                </Grid>
                <Grid sx={{ p: 10, display: show ? "block" : "none" }} >
                    <Typography>No rides found</Typography>
                </Grid>
            
            
        </Box>
        :<Typography>Add Vechicle to publish rides</Typography>}
        </Box>
                
    )
}
