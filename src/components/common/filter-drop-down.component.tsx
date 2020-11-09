import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { LocationFilterDropDown } from './location-filter-drop-down.component';

const useStyles = makeStyles({
    dropDown: {
        minWidth: 150,
        marginLeft: 5,
        marginRight: 5
    }
});

export interface FilterDropDownComponentProps {
    questionType: (e: string) => void;
    location: (e: string) => void;
}

export const FilterDropDown: React.FC<FilterDropDownComponentProps> = (props) => {
    const classes = useStyles();
    const [questionType, setQuestionType] = useState('');
    const [locationForm, setLocationForm] = useState(false);

    const handleQuestionTypeChange = (e: any) => {
        setQuestionType(e.target.value);
        props.questionType(e.target.value);
        handleLocationForm(e.target.value);
    }

    const handleLocationChange = (e: string) => {
        props.location(e);
    }

    const handleLocationForm = (e: any) => {
        if(e === 'Location')
            setLocationForm(true);
        else{
            setLocationForm(false);
            props.location('');
        }
            
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
                {locationForm ? <LocationFilterDropDown location={(e:string) => handleLocationChange(e)}/> : null}
            </Box>
        </div>
    )
}