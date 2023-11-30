import { Box, Button, InputBase, Typography } from '@mui/material'
import React, { useState } from 'react'
import dl from "../assets/driving-license.png"
import { GlobalContext } from '../Context/GlobalContext'
import axios from 'axios'
import { Constants } from '../Constants'
import { useNavigate } from 'react-router-dom'
export default function Addvehicle() {

  const [Vehicle, setvehicle] = useState({
    userId: "",
    Driverlicense: "",
    Proofofautoinsurance: "",
    Financedocuments: [],
    CarImages: [],
    Carname: "",
    Carmodel: "",
    licensenumberofcar: "",
    Yearofmodel: ""
  })

  const [UploadImages, setUploadImages] = useState({
    Driverlicense: "",
    Proofofautoinsurance: "",
    Financedocuments: [],
    CarImages: []
  })


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
           setSpin(false)
           setvehicle({...Vehicle,userId:data.id})
        }
    }

    React.useEffect(() => {

        if (token !== null) {
            verifyuser()
        } else {
            navigate("/log-in")
        }
    }, [])


  const UploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await axios.post(Constants.END_POINT + "/uploadimage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  const { SETERROR, SETSUCCESS, setSpin} = React.useContext(GlobalContext)
  const navigate=useNavigate()
  const SubmitVehicle = async () => {
    setSpin(true)
    var temp = {
      Driverlicense: "",
      Proofofautoinsurance: "",
      Financedocuments: [],
      CarImages: []
    }
    if (Vehicle.Driverlicense === "" || Vehicle.Proofofautoinsurance === "" || Vehicle.CarImages.length === 0 || Vehicle.Carname === "" || Vehicle.Carmodel === "" || Vehicle.licensenumberofcar === "" || Vehicle.Yearofmodel === "") {
      setSpin(false)
      SETERROR("Fill All the mandatory Fields")
    } else {
      await UploadFile(Vehicle.Driverlicense).then(async (res) => {
        console.log(res.data)
        temp.Driverlicense=res.data.Location 
        await UploadFile(Vehicle.Proofofautoinsurance).then((res) => {
          console.log(res)
          temp.Proofofautoinsurance=res.data.Location
          Vehicle.Financedocuments.map(async (file) => {
            await UploadFile(file).then((res) => {
              console.log(res)
              temp.Financedocuments.push(res.data.Location)
              Vehicle.CarImages.map(async (file) => {
                await UploadFile(file).then(async (res) => {
                  console.log(res)
                  temp.CarImages.push(res.data.Location)
                  console.log(temp)

                  const data = {
                    ...Vehicle,
                    Driverlicense:temp.Driverlicense,
                    Proofofautoinsurance:temp.Proofofautoinsurance,
                    Financedocuments:temp.Financedocuments,
                    CarImages:temp.CarImages,
                    status:"under process"
                  }

                  await axios.post(Constants.END_POINT+"/newvehicle",data).then((res)=>{
                      SETSUCCESS("Vehicle added Successfully")
                      setSpin(false)
                      navigate(0)
                  }).catch(()=>{
                      SETERROR("Unable to add vehicle try again")
                      setSpin(false)
                  })


                 
                })
              })
            })
          })
        })

      })









    }
  }

  return (
    <Box sx={{ p: 2, mb: 10 }}>
      <Typography variant='h5' sx={{ mb: 2 }} >Add Vehicle</Typography>

      <Typography sx={{}} >Car Model*</Typography>
      <InputBase  sx={{ border: "1px solid black", width: "100%", borderRadius: 2, px: 1, py: 0.1 }} placeholder='eg:Nissan Altima' value={Vehicle.Carmodel} onChange={(e) => {
        setvehicle({ ...Vehicle, Carmodel: e.target.value })
      }} />

      <Typography sx={{ mt: 3 }} >Car name*</Typography>
      <InputBase sx={{ border: "1px solid black", width: "100%", borderRadius: 2, px: 1, py: 0.1 }} placeholder='eg:Nissan' value={Vehicle.Carname} onChange={(e) => {
        setvehicle({ ...Vehicle, Carname: e.target.value })
      }} />

      <Typography sx={{ mt: 3 }} >license number of car*</Typography>
      <InputBase sx={{ border: "1px solid black", width: "100%", borderRadius: 2, px: 1, py: 0.1 }} placeholder='eg: LEG 8005' value={Vehicle.licensenumberofcar} onChange={(e) => {
        setvehicle({ ...Vehicle, licensenumberofcar: e.target.value })
      }} />

      <Typography sx={{ mt: 3 }} >Year of model*</Typography>
      <InputBase type='number' sx={{ border: "1px solid black", width: "100%", borderRadius: 2, px: 1, py: 0.1 }} placeholder='eg:2015' value={Vehicle.Yearofmodel} onChange={(e) => {
        setvehicle({ ...Vehicle, Yearofmodel: e.target.value })
      }} />

      <Typography sx={{ mt: 3 }} >Driving License*</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {Vehicle.Driverlicense !== "" ? <img src={URL.createObjectURL(Vehicle.Driverlicense)} style={{ width: 450, height: 200, margin: 10 }} /> : <></>}
        <InputBase type='file' sx={{ mt: 0 }} inputProps={{ accept: 'image/*' }} onChange={(e) => {
          setvehicle({ ...Vehicle, Driverlicense: e.target.files[0] })
        }} />
      </Box>
      <Typography sx={{ mt: 3 }} >Proofofautoinsurance*</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {Vehicle.Proofofautoinsurance !== "" ? <img src={URL.createObjectURL(Vehicle.Proofofautoinsurance)} style={{ width: 450, height: 200, margin: 10 }} /> : <></>}
        <InputBase type='file' sx={{ mt: 0 }} inputProps={{ accept: 'image/*' }} onChange={(e) => {
          setvehicle({ ...Vehicle, Proofofautoinsurance: e.target.files[0] })
        }} />
      </Box>
      <Typography sx={{ mt: 3 }} >Financedocuments</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {Vehicle.Financedocuments.length !== 0 ? Vehicle.Financedocuments.map((file) =>
          <img src={URL.createObjectURL(file)} style={{ width: 450, height: 200, margin: 10 }} />
        )

          : <></>}
        <InputBase type='file' sx={{ mt: 0 }} inputProps={{ accept: 'image/*' }} onChange={(e) => {
          setvehicle({ ...Vehicle, Financedocuments: [...Vehicle.Financedocuments, e.target.files[0]] })
        }} />
      </Box>


      <Typography sx={{ mt: 3 }} >CarImages*</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {Vehicle.CarImages.length !== 0 ? Vehicle.CarImages.map((file) =>
          <img src={URL.createObjectURL(file)} style={{ width: 450, height: 200, margin: 10 }} />
        )

          : <></>}
        <InputBase type='file' sx={{ mt: 0 }} inputProps={{ accept: 'image/*' }} onChange={(e) => {
          setvehicle({ ...Vehicle, CarImages: [...Vehicle.CarImages, e.target.files[0]] })
        }} />
      </Box>


      <Button sx={{ width: "100%", mt: 10 }} variant='contained' onClick={() => SubmitVehicle()} >Submit</Button>

    </Box>
  )
}
