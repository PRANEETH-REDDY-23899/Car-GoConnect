import { Autocomplete, Box, Grid, InputBase, Typography } from '@mui/material'
import React from 'react'
import { Constants } from '../Constants'
import axios from 'axios'
import parse from 'autosuggest-highlight/parse'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function LocationAuto({setValue}) {
    const [options, setOptions] = React.useState([])
    const [Location, setLocation] = React.useState('')
    const [value, setvalue] = React.useState(null)
    const [Err, setErr] = React.useState("")
    return (
        <Autocomplete
            sx={{mx:2}}
            freeSolo
            selectOnFocus
            
            handleHomeEndKeys
            options={options}
            onChange={(e, v) => {
                setvalue(v)
                setValue(v)
            }}
            filterOptions={(x) => x}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onInputChange={(e, v) => {
                setErr("")
                if (v.length >= 1) {
                    axios.get(Constants.END_POINT + "/places/" + v).then((res) => {
                        setOptions(res.data.predictions)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                // Regular option
                return option.description;
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            noOptionsText="No locations"
            renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return <InputBase {...params.InputProps} {...rest} sx={{ border: 1, borderColor: "black", px: 1, borderRadius: 1 }} />;
            }}


            renderOption={(props, option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}

                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>

                        </Grid>
                    </li>
                );
            }}

        />
    )
}
