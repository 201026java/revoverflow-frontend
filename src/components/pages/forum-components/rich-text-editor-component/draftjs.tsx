/**
 * @file 
 * @author D. Jared Chase 
 * @author Milton Reyes
 * @author Jerry Pujals
 */

import React from 'react';
import { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, createMuiTheme, makeStyles, ThemeProvider, Box, Container, Typography, FormControl, InputBase} from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import HttpIcon from '@material-ui/icons/Http';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import * as questionRemote from '../../../../remotes/question.remote';
import { useHistory } from 'react-router';
import { BreadcrumbBarComponent } from '../../breadcrumb-bar.component';
import { FilterDropDown } from '../../../common/filter-drop-down.component';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#3498db',
        },
    },
});

const useStyles = makeStyles({
    boxInternal: {
        color: "#f26925"
    },
    containerTool: {
        paddingTop: 50,
        width: "70%",
        display: "flex",
        flexDirection: "column",
    },
    titleTool: {
        borderStyle: "solid",
        borderColor: "#f26925",
        height: "6vh",
        overflowY: "auto",
    },
    editorTool: {
        borderStyle: "solid",
        borderColor: "#f26925",
        height: "40vh",
        overflowY: "auto",
        fontSize: 20,
        padding: 10
    },
    buttonInternal: {
        padding: 2,
        marginBottom: 3
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20
    },
    font: {
        fontSize: 25,
        paddingLeft: 10
    },
    dropDownBox: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: 10,
        marginBottom: 10,
    }
});

const styleMap = {
    'HIGHLIGHT': {
        padding: 4,
        'backgroundColor': '#D3D3D3'
    }
};

export const RichTextEditorComponent: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [location, setLocation] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onChange = (editorState: EditorState) => setEditorState(editorState);
    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        } else {
            return 'not-handled';
        }
    }

    //TODO: Send question type and location
    const saveQuestion = async () => {
        const contentState = editorState.getCurrentContent();
        const payload: any = {
            title: title,
            content: JSON.stringify(convertToRaw(contentState)),
            creationDate: new Date(),
            status: false,
            userID: +JSON.parse(JSON.stringify(localStorage.getItem('userId')))
        }
        await questionRemote.postQuestion(payload);
        history.push("/feed");
        window.location.reload(false);
    }

    const handleQuestionTypeChange = (e: string) => {
        setQuestionType(e);
        console.log(questionType);
    }

    const handleLocationChange = (e: string) => {
        setLocation(e);
        console.log(location);
    }
    
    //INLINE and BLOCK LEVEL styles, consists of these functions and an array of buttons to map to span button elements
    const buttonVariant = (name: string) => {
        const currentInLineStyle = editorState.getCurrentInlineStyle();
        if (currentInLineStyle.has(name)) {
            return true;
        } else {
            return false;
        }
    }
    const blockbuttonVariant = (name: string) => {
        const currentInLineStyle = RichUtils.getCurrentBlockType(editorState);
        if (currentInLineStyle === name) {
            return true;
        } else {
            return false;
        }
    }

    const onBoldClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    const onItalicClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }
    const onUnderlineClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }
    const onStrikethroughClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
    }
    const onCodeClick = (event: any) => {
        event.preventDefault();
        let editor: EditorState = editorState;
        editor = RichUtils.toggleInlineStyle(editor, 'HIGHLIGHT');
        editor = RichUtils.toggleInlineStyle(editor, 'CODE');
        onChange(editor);
    }
    const onHead1Click = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'header-one'));
    }
    const onHead2Click = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'header-two'));
    }
    const onHead3Click = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'header-three'));
    }
    const onOrderClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
    }
    const onUnorderClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    }
    const onAddLink = (event: any) => {

        event.preventDefault();

        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            let url = prompt("Select text then enter link", "");

            if (!url) return

            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                { url: url }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

            onChange(RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ));

        } else {
            alert('No text selected')
        }
    };

    const buttons = [
        { function: onBoldClick, name: <FormatBoldIcon />, style: 'BOLD' },
        { function: onItalicClick, name: <FormatItalicIcon />, style: 'ITALIC' },
        { function: onUnderlineClick, name: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
        { function: onStrikethroughClick, name: <StrikethroughSIcon />, style: 'STRIKETHROUGH' },
        { function: onCodeClick, name: <CodeIcon />, style: 'CODE' }]
    const blockbuttons = [

        { function: onOrderClick, name: <FormatListNumberedIcon />, block: 'ordered-list-item' },
        { function: onUnorderClick, name: <FormatListBulletedIcon />, block: 'unordered-list-item' },
        { function: onHead1Click, name: 'H1', block: 'header-one' },
        { function: onHead2Click, name: 'H2', block: 'header-two' },
        { function: onHead3Click, name: 'H3', block: 'header-three' }]
    const linkbutton = [{ function: onAddLink, name: <HttpIcon /> }]

    return (
        <div className={classes.breadcrumbBar}>
            <BreadcrumbBarComponent />
            <ThemeProvider theme={theme} >
                <Container className={classes.containerTool}>
                    <Box justifyContent="flex-start" display="flex" padding={3} >
                        <Typography variant="h4" >
                            Ask a Question:
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex">
                            <Typography variant="h5" >
                                Title:
                            </Typography>
                        </Box>
                        <Box display="flex" className={classes.titleTool}>
                            <FormControl fullWidth variant="outlined"   >
                                <InputBase className={classes.font}
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={classes.dropDownBox}>
                        <FilterDropDown questionType={(e:string) => handleLocationChange(e)} location={(e:string) => handleQuestionTypeChange(e)}/>
                    </Box>
                    <Box>
                        <Box justifyContent="center" display="flex" flexDirection="column">
                            <Box justifyContent="flex-start" display="flex" >
                                <Typography variant="h5">
                                    Content:
                                </Typography>
                            </Box>
                            <Box justifyContent="flex-start" display="flex" flexWrap="wrap">
                                {buttons.map(b =>
                                    buttonVariant(b.style) ?
                                        <span key={b.style} className={classes.buttonInternal}>
                                            <Button key={b.style} onMouseDown={b.function} variant='contained' color='primary' size='small' >{b.name}</Button>
                                        </span>
                                        :
                                        <span key={b.style} className={classes.buttonInternal}>
                                            <Button key={b.style} onMouseDown={b.function} size='small' color='secondary' variant='contained' >{b.name} </Button>
                                        </span>)}
                                {blockbuttons.map(b =>
                                    blockbuttonVariant(b.block) ?
                                        <span className={classes.buttonInternal}>
                                            <Button key={b.block} onMouseDown={b.function} variant='contained' color='primary' size='small' >{b.name}</Button>
                                        </span>
                                        :
                                        <span key={b.block} className={classes.buttonInternal}>
                                            <Button key={b.block} onMouseDown={b.function} size='small' color='secondary' variant='contained'>{b.name}</Button>
                                        </span>)}
                                {linkbutton.map(b =>
                                    <span className={classes.buttonInternal}>
                                        <Button onMouseDown={b.function} size='small' color='secondary' variant='contained'>{b.name}</Button>
                                    </span>
                                )}
                            </Box>
                        </Box >
                        <Box justifyContent="center" display="flex" flexDirection="column" className={classes.editorTool} >
                            <Editor
                                customStyleMap={styleMap}
                                editorState={editorState}
                                handleKeyCommand={handleKeyCommand}
                                onChange={onChange}
                            />
                        </Box>
                        <Box justifyContent="flex-end" display="flex" padding={2} paddingBottom={20}>
                            <Button onClick={saveQuestion} variant='contained' color='secondary' size='large' >Submit</Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}