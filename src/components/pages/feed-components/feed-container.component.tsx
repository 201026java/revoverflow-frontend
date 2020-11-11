/**
 * @file Contains and manages the questions and answer boxes populated into the feed
 * @author Keith Salzman
 * 
 * @Additions Added the ability to incorporate Question Type and location filtering when viewing the feed
 * @author Soksivateara Eng
 */

//TODO:Refresh the list of questions everytime you change the filter so some sort of useEffect to call Load again but has to know the view
import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, createMuiTheme, ThemeProvider, Box, Button, makeStyles} from '@material-ui/core';
import FeedBoxComponent from './feed-box.component';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import Pagination from '@material-ui/lab/Pagination';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import { useHistory } from 'react-router';
import * as answerRemote from '../../../remotes/answer.remote';
import * as questionRemote from '../../../remotes/question.remote';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickTab } from '../../../actions/question.actions';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { FilterDropDown } from '../../common/filter-drop-down.component';

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
    boxExternal: {
        minWidth: 500
    },
    boxInternal: {
        color: "#f26925",
    },
    containerInternal: {
        paddingTop: 10,
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20,
    },
});

export interface FeedContainerComponentProps {
    storeQuestions: Question[]
    clickTab: (questions: Question[], tab: number, pageCount: number, page: number) => void;
    storeTab: number;
    storePageCount: number;
    storePage: number;
}

export const FeedContainerComponent: React.FC<FeedContainerComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [view, setView] = useState<'question' | 'answer' | 'confirm' | 'recent'>('recent');
    const [value, setValue] = React.useState(props.storeTab);
    const [questionType, setQuestionType] = useState('');
    const [location, setLocation] = useState('');
    //const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
    const userId = 0;
    //const admin = (localStorage.getItem("admin"));
    const admin = 'true';
    const size = 10;
    let filteredQuestions: Question[] = [];

    useEffect(() => {
        load(view, 0, questionType, location);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionType, location]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        load(view, value - 1, questionType, location);
    };

    const handleQuestionTypeChange = (e: string) => {
        setQuestionType(e);
    }

    const handleLocationChange = (e: string) => {
        setLocation(e);
    }

    /**
     * Populates the feed with answers or questions according to the particular view and page input. 
     * @param view string variable that dictates what is displayed in the rendered feed box components
     * @param page number variable that describes which page to display form the paginated information recieved from the server
     */
    const load = async (view: string, page: number, questionType: string, location: string) => {
        let retrievedPageable: any;
        let tab: any;

        if(questionType === '' && location === '' ) {
            if (view === 'recent') {
                retrievedPageable = await questionRemote.getAllQuestions(size, page);
                tab = 0;
                setView(view);
                if (retrievedPageable.numberOfElements === 0) {
                    return;
                }
            } else if (view === 'question') {
                retrievedPageable = await questionRemote.getQuestionsByUserId(userId, size, page);
                tab = 1;
                setView(view)
            } else if (view === 'answer') {
                retrievedPageable = await answerRemote.getAnswersByUserId(userId, size, page);
                tab = 2;
                setView(view)
            } else if (view === 'confirm') {
                retrievedPageable = await questionRemote.getUnconfirmedQuestions(size, page);
                tab = 3;
                setView(view)
            }
        }
        else{
            if (view === 'recent') {
                retrievedPageable = await questionRemote.getAllFilteredQuestions(userId, size, page, questionType, location);
                tab = 0;
                setView(view);
                if (retrievedPageable.numberOfElements === 0) {
                    return;
                }
            } else if (view === 'question') {
                retrievedPageable = await questionRemote.getFilteredQuestionsByUserId(userId, size, page, questionType, location);
                tab = 1;
                setView(view)
            } else if (view === 'answer') {
                retrievedPageable = await answerRemote.getFilteredAnswers(userId, size, page, questionType, location);
                tab = 2;
                setView(view)
            } else if (view === 'confirm') {
                retrievedPageable = await questionRemote.getFilteredUnconfirmedQuestions(size, page, questionType, location);
                tab = 3;
                setView(view)
            }
        }

        props.clickTab(retrievedPageable.content, tab, retrievedPageable.totalPages, retrievedPageable.number);
        
    }

    if (props.storeQuestions.length === 0 && view === 'recent') {
        load("recent", 0, questionType, location);
    }

    /**
     * Maps the questions or answers into feed boxes to be displayed within the feed container.
     */
    const renderFeedBoxComponents = () => {
        if (view === 'confirm') {
            filteredQuestions = props.storeQuestions.filter(question => question.acceptedId !== null);
            return filteredQuestions.map(question => {
                return (
                    <FeedBoxComponent key={question.id} question={question} questionContent={question.content} view={view} />
                )
            })
        } else {
            return props.storeQuestions.map(question => {
                console.log(question)
                return (
                    <FeedBoxComponent key={question.id} question={question} questionContent={question.content} view={view} />
                )
            })
        }
    }

    const handleRedirect = () => {
        history.push('/question');
    }

    return (
        <div>
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <Box justifyContent="flex-end" display="flex" >
                    <ThemeProvider theme={theme} >
                        <Button variant="contained" color="secondary" onClick={() => handleRedirect()}>
                            Ask a Question
                        </Button>
                    </ThemeProvider>
                </Box>
                <Box>
                    <FilterDropDown questionType={(e:string) => handleQuestionTypeChange(e)} location={(e:string) => handleLocationChange(e)}/>
                </Box>
                <ThemeProvider theme={theme} >
                    <Box justifyContent="center" display="flex" className={classes.boxExternal}>
                        <Tabs
                            value={value}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="fullWidth"
                            scrollButtons="auto"
                            onChange={handleChange}
                        >
                            <Tab icon={<DynamicFeedOutlinedIcon fontSize="large" />} label="RECENT" className={classes.boxInternal}
                                onClick={(e) => load("recent", 0, questionType, location)} />
                            <Tab icon={<LiveHelpIcon fontSize="large" />} label="MY QUESTIONS" className={classes.boxInternal}
                                onClick={(e) => load("question", 0, questionType, location)} />
                            <Tab icon={<QuestionAnswerIcon fontSize="large" />} label="MY ANSWERS" className={classes.boxInternal}
                                onClick={(e) => load("answer", 0, questionType, location)} />
                            {admin === 'true' ? <Tab icon={<ConfirmationNumberOutlinedIcon fontSize="large" onClick={(e) => load("confirm", 0, questionType, location)} />}
                                label="CONFIRM" className={classes.boxInternal} /> : ""}
                        </Tabs>
                    </Box>
                    <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {renderFeedBoxComponents()}
                        </Box>
                    </div>
                    <Box display="flex" justifyContent="center" padding={5}>
                        <Pagination size="medium" count={props.storePageCount} page={props.storePage + 1} color="secondary" onChange={handlePageChange} />
                    </Box>
                </ThemeProvider>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestions: state.questionState.collectedQuestions,
        storeQuestion: state.questionState.storeQuestion,
        storeTab: state.questionState.storeTab,
        storePageCount: state.questionState.storePageCount,
        storePage: state.questionState.storePage,
    }
}

const mapDispatchToProps = {
    clickTab
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainerComponent);