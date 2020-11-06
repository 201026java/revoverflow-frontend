import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles({
    dropDown: {
        minWidth: 150,
        margin: 5
    }
});

export interface FilterDropDownComponentProps {
    questionType: (e: string) => void;
    location: (e: string) => void;
}

export const FilterDropDown: React.FC<FilterDropDownComponentProps> = (props) => {
    const classes = useStyles();
    const [questionType, setQuestionType] = useState('');
    const [location, setLocation] = useState('');
    const [locationForm, setLocationForm] = useState(false);

    const handleQuestionTypeChange = (e: any) => {
        setQuestionType(e.target.value);
        props.questionType(e.target.value);
        handleLocationForm(e.target.value);
    }

    const handleLocationChange = (e: any) => {
        setLocation(e.target.value);
        props.location(e.target.value);
    }

    const handleLocationForm = (e: any) => {
        if(e === 'Location')
            setLocationForm(true);
        else
            setLocationForm(false);
    }

    const LocationForm = () => {
        return(
            <FormControl className={classes.dropDown}>
                <InputLabel id="location-label">Location</InputLabel>
                <Select labelId="location-label" id="location" value={location} onChange={(e: any) => handleLocationChange(e)}>
                    <MenuItem value={''}>Any</MenuItem>
                    <MenuItem value={"UTA"}>UTA</MenuItem>
                </Select>
            </FormControl>
        )
    }

    return(
        <div>
            <Box>
                <FormControl className={classes.dropDown}>
                    <InputLabel id="question-type-label">Question Type</InputLabel>
                    <Select labelId="question-type-label" id="question-type" value={questionType} onChange={(e: any) => handleQuestionTypeChange(e)}>
                        <MenuItem value={''}>Any</MenuItem>
                        <MenuItem value={"Revature"}>Revature</MenuItem>
                        <MenuItem value={"Location"}>Location</MenuItem>
                    </Select>
                </FormControl>
                {locationForm ? <LocationForm /> : null}
            </Box>
        </div>
    )
}