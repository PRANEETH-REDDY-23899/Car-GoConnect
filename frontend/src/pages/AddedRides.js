import { Box, Button, Card, Grid, InputBase, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import axios from 'axios'
import { Constants } from '../Constants'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddedRides() {
  const navigate = useNavigate()
  const [Rides, setRides] = useState({})
  const { SETERROR, SETSUCCESS, setSpin } = React.useContext(GlobalContext)
  const [Vehicles, setVehicles] = useState([])

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

      await axios.get(Constants.END_POINT + "/getrides/" + data.id).then(async (res) => {
        setSpin(false)
        setRides(res.data)
        console.log(res.data)
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


  return (
    <Box>
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
                  <Button sx={{ display: isfeedback[index] === null ? "" : "none" }} onClick={async () => {
                    await axios.post(Constants.BACKEND_END_POINT + "/addfeedback", {
                      rideid: ride._id,
                      adminfeedback: feedback,

                    }).then(() => {
                      SETSUCCESS("Successfully submited feedback")
                      handleClose()
                      navigate(0)
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

                  <Typography sx={{ textTransform: "capitalize", fontWeight: "bold", color: "blue" }} >{ride.status}</Typography>
                  <Button sx={{ mt: 2 }} variant='outlined' onClick={async () => {
                    await axios.post(Constants.END_POINT + "/deleteride", { id: ride._id }).then((res) => {
                      SETSUCCESS("Successfully deleted")
                      navigate(0)

                    })
                  }} >Delete Ride</Button>


                </Box>

                <Box sx={{ ml: 5 }}>


                  <Button sx={{ mt: 2, display: ride.endride ? "none" : "" }} variant='outlined' onClick={async () => {
                    await axios.post(Constants.END_POINT + "/endride", { _id: ride._id }).then((res) => {
                      console.log(ride)
                      SETSUCCESS("Successfully ended ride")
                      navigate(0)

                    })
                  }} >{"End Ride"}</Button>


                  <Button sx={{ mt: 2, display: ride.endride ? isfeedback[index] === null ? "" : isfeedback[index]?.adminfeedback ===undefined ? "" : "none" : "none" }} variant='outlined' onClick={async () => {
              
                    setOpen(true)
                  }} >{"feedback"}</Button>

                  <Button sx={{ mt: 2, display: ride.endride ? isfeedback[index] === null ? "none" : isfeedback[index]?.adminfeedback ===undefined ? "none" : "" : "none" }} variant='outlined' onClick={async () => {
                  
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
