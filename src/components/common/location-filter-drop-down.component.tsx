import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles({
    dropDown: {
        minWidth: 150
    }
});

export interface LocationFilterDropDownComponentProps {
    location: (e: string) => void;
}

export const LocationFilterDropDown: React.FC<LocationFilterDropDownComponentProps> = (props) => {
    const classes = useStyles();
    const [location, setLocation] = useState('');

    const handleLocationChange = (e: any) => {
        setLocation(e.target.value);
        props.location(e.target.value);
    }

    return(
        <FormControl className={classes.dropDown}>
            <InputLabel id="location-label">Location</InputLabel>
            <Select labelId="location-label" id="location" value={location} onChange={(e: any) => handleLocationChange(e)}>
                <MenuItem value={''}>Any</MenuItem>
                <MenuItem value={"UTA"}>UTA</MenuItem>
            </Select>
        </FormControl>
    );
}