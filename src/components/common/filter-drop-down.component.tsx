/**
 * @file Handles a drop down menu for filtering 
 * @author Soksivateara Eng
 */
import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { LocationFilterDropDown } from './location-filter-drop-down.component';
import { questionTypeList } from './questionTypeList';

const useStyles = makeStyles({
    dropDown: {
        minWidth: 150,
        marginLeft: 5,
        marginRight: 5
    }
});

/**
 * Passing functions as props to send filters to the 
 * parent component whatever that component maybe. 
 * Mainly seen in the feed-container.component in the time being
 */
export interface FilterDropDownComponentProps {
    questionType: (e: string) => void;
    location: (e: string) => void;
}

export const FilterDropDown: React.FC<FilterDropDownComponentProps> = (props) => {
    const classes = useStyles();
    const [questionType, setQuestionType] = useState('');
    const [locationForm, setLocationForm] = useState(false);

/**
 * Sets the component's questionType, sends the value to the parent,
 * and changes the boolean value for the location form vibilitiy 
 */
    const handleQuestionTypeChange = (e: any) => {
        setQuestionType(e.target.value);
        props.questionType(e.target.value);
        handleLocationForm(e.target.value);
    }

/**
 * Sends the location value to the parent
 */
    const handleLocationChange = (e: string) => {
        props.location(e);
    }

/**
 * Conditionally renders location form and if set to 
 * false then it will reset the value to an empty string
 */
    const handleLocationForm = (e: any) => {
        if(e === 'Location')
            setLocationForm(true);
        else{
            setLocationForm(false);
            props.location('');
        }
            
    }

/**
 * maps a list of questionTypes to MenuItems and renders them
 */
    const ShowquestionType = () => {
        return questionTypeList.map(questionType => {
            return(
                <MenuItem key={questionType} value={questionType}>{questionType}</MenuItem>
            )
        })
    }

/**
 * The base filter is questionType while locationForm is abstracted out.
 * Ideally any other filer dropdown menu will be abstracted out and conditionally rendered here.
 */
    return(
        <div>
            <Box>
                <FormControl className={classes.dropDown}>
                    <InputLabel id="question-type-label">Question Type</InputLabel>
                    <Select labelId="question-type-label" id="question-type" value={questionType} onChange={(e: any) => handleQuestionTypeChange(e)}>
                        <MenuItem key={'Any'} value={''}>Any</MenuItem>
                        {ShowquestionType()}
                    </Select>
                </FormControl>
                {locationForm ? <LocationFilterDropDown location={(e:string) => handleLocationChange(e)}/> : null}
            </Box>
        </div>
    )
}