/**
 * @file Handles a drop down menu for location filtering
 * @author Soksivateara Eng
 */
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { locationList } from './locationsList';

const useStyles = makeStyles({
    dropDown: {
        minWidth: 150
    }
});

/**
 * Has a function to send location value to the parent
 */
export interface LocationFilterDropDownComponentProps {
    location: (e: string) => void;
}

export const LocationFilterDropDown: React.FC<LocationFilterDropDownComponentProps> = (props) => {
    const classes = useStyles();
    const [location, setLocation] = useState('');

/**
 * Sets location value in state and sends the value to the parent
 */
    const handleLocationChange = (e: any) => {
        setLocation(e.target.value);
        props.location(e.target.value);
    }

/**
 * Maps a list of states in the US to MenuItems
 */
    const showLocations = () => {
        return locationList.map(location => {
            return(
                <MenuItem key={location} value={location}>{location}</MenuItem>
            )
        })
    }

    return(
        <FormControl className={classes.dropDown}>
            <InputLabel id="location-label">Location</InputLabel>
            <Select labelId="location-label" id="location" value={location} onChange={(e: any) => handleLocationChange(e)}>
                <MenuItem key={'Any'} value={''}>Any</MenuItem>
                {showLocations()}
            </Select>
        </FormControl>
    );
}