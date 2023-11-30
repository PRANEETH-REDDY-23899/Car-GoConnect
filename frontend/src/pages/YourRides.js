import { Box, Button, Card, Grid, IconButton, InputBase, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import axios from 'axios'
import { Constants } from '../Constants'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import MessageIcon from '@mui/icons-material/Message';
import SingleChat from './SingleChat'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function YourRides() {

  const token = localStorage.getItem("jwt")
  const [isfeedback, setisfeedback] = useState({})

  const [feedback, setfeedback] = useState("")

  const [open, setOpen] = React.useState(false);
  const [view,setview] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setview(false)
  };

  const [userid, setuserid] = React.useState("")
  const [receiverid, setreceiverid] = useState("")
  const [openchat, setopenchat] = React.useState(false);
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
      navigate("/log-in");
    } else {
      setuserid(data.id)
      axios.get(Constants.END_POINT + "/YourRides/" + data.id).then(async (res) => {
        setSpin(false)
        console.log(res.data)
        setRides(res.data)
        await axios.post(Constants.END_POINT + "/getfeedback", res.data.Rides).then((res) => {
          console.log(res.data)
          setisfeedback(res.data)
        })
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

  const navigate = useNavigate()
  const [Rides, setRides] = useState({})
  const { SETERROR, SETSUCCESS, setSpin } = React.useContext(GlobalContext)
  const [Vehicles, setVehicles] = useState([])


  return (
    <Box>

      {userid !== "" ? <SingleChat open={openchat} setopen={setopenchat} userid={receiverid} loggedinuser={userid} setloggedinuser={setreceiverid} /> : <></>}
      {Object.keys(Rides).length !== 0 ?
        <Grid container sx={{ p: 2 }}>

          {Rides.Rides.map((ride, index) =>
            <Grid item xs={12} sx={{ p: 1 }} >

<Dialog open={view} onClose={handleClose} sx={{}}>
                
                <DialogTitle> View feedback</DialogTitle>
                <DialogContent>
                  <Typography>user feedback</Typography>
                  <InputBase
                    sx={{ border: "2px solid black", borderRadius: 2, height: 100, width: 500, alignItems: "start", justifyContent: "start", px: 1 }}
                    multiline
                    value={isfeedback[index]?.user}
                   

                  />
                  <Typography>Driver feedback</Typography>
                  <InputBase
                    sx={{ border: "2px solid black", borderRadius: 2, height: 100, width: 500, alignItems: "start", justifyContent: "start", px: 1 }}
                    multiline
                    value={isfeedback[index]?.adminfeedback}
                   

                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={open} onClose={handleClose} sx={{}}>
                <DialogTitle> Send Feedback</DialogTitle>
                <DialogContent>

                  <InputBase
                    sx={{ border: "2px solid black", borderRadius: 2, height: 100, width: 500, alignItems: "start", justifyContent: "start", px: 1 }}
                    multiline
                    value={feedback}
                    onChange={(e) => {
                      setfeedback(e.target.value)
                    }}

                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button sx={{  }} onClick={async () => {
                    await axios.post(Constants.BACKEND_END_POINT + "/addfeedback", {
                      rideid: ride._id,
                      user: feedback,

                    }).then(() => {
                      SETSUCCESS("Successfully submited feedback")
                      handleClose()
                    })
                  }}>Submit</Button>
                </DialogActions>
              </Dialog>
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



                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ textTransform: "capitalize", fontWeight: "bold", color: "blue" }} >{ride.status}</Typography>
                    <IconButton sx={{ ml: 2 }} onClick={() => {
                      setreceiverid(ride.UserId)
                      setopenchat(true)
                    }} >
                      <MessageIcon />
                    </IconButton>
                  </Box>
                  <Button sx={{ mt: 2 }} variant='outlined' onClick={async () => {

                  }} >Booked</Button>

                  <Button sx={{ mt: 2, display: ride.endride ? isfeedback[index] === null ? "" : isfeedback[index]?.user===undefined ? "" : "none" : "none" }} variant='outlined' onClick={async () => {
      
                    setOpen(true)
                  }} >{"feedback"}</Button>

                  <Button sx={{ mt: 2, display: ride.endride ? isfeedback[index] === null ? "none" : isfeedback[index]?.user===undefined ? "none" : "" : "none" }} variant='outlined' onClick={async () => {
                    setview(true)
                  }} >{"view feedback"}</Button>



                </Box>

              </Card>
            </Grid>

          )}

        </Grid>
        : <></>}
    </Box>
  )
}
