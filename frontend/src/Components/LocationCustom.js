import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Card, Grid, InputBase, Typography } from '@mui/material';
import { Breakpoints } from './Breakpoints';
import ButtonCustom from './ButtonCustom';
import axios from 'axios';
import { Constants } from '../Constants';
import parse from 'autosuggest-highlight/parse';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Label from './Label';
import { useNavigate } from 'react-router-dom';
import { CheckLocation } from '../Functions/Registration';
import Error from './Error';

import { SignUpContext } from '../Context/SignupContext';
import Location from './Location';
import LocationAuto from './LocationAuto';


export default function FreeSolo() {
    
    const [options, setOptions] = React.useState([])
    // const [Location, setLocation] = React.useState('')
    const [value, setvalue] = React.useState(null)
    const [Err,setErr]=React.useState("")
    const navigate = useNavigate()

    const {setSignUpData,SignUpData}=React.useContext(SignUpContext)

    console.log(value)
    return (
        <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: Breakpoints("100%", 370, 370, 370, 370, 370),p:2 }}>
            <Label text={"Select Location"} fs={17}  ></Label>
            <Location   border="1px solid black" field='ninty' setValue={setvalue} />
            <Error msg={Err} mb={1}></Error>
            <ButtonCustom
                text={"Continue"}
                mx={2}
                Click={() => CheckLocation(value,setErr,navigate,setSignUpData,SignUpData)}
            />

        </Card>
    );
}

