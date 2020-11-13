/**
 * @file Shows all questions that are under the revature filter. Structure is similar to feed-container.component
 * @author Soksivateara Eng
 */

import React, { useEffect, useState } from 'react';
import { Container, createMuiTheme, ThemeProvider, Box, makeStyles} from '@material-ui/core';
import FeedBoxComponent from '../feed-components/feed-box.component';
import Pagination from '@material-ui/lab/Pagination';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import * as questionRemote from '../../../remotes/question.remote';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickTab } from '../../../actions/question.actions';

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

export interface RevatureComponentProps {
    storeQuestions: Question[]
    clickTab: (questions: Question[], tab: number, pageCount: number, page: number) => void;
    storeTab: number;
    storePageCount: number;
    storePage: number;
}

export const RevatureQuestions: React.FC<RevatureComponentProps> = (props) => {
    const classes = useStyles();
    const [view, setView] = useState('recent');
    const [questionType] = useState('Revature');
    const [location] = useState('');
    const userId = 0;
    const size = 10;

    useEffect(() => {
        load(view, 0, questionType, location);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        load(view, value - 1, questionType, location);
    };

    const load = async (view: string, page: number, questionType: string, location: string) => {
        let retrievedPageable: any;
        let tab: any;

        retrievedPageable = await questionRemote.getAllFilteredQuestions(userId, size, page, questionType, location);
        tab = 0;
        setView(view);

        props.clickTab(retrievedPageable.content, tab, retrievedPageable.totalPages, retrievedPageable.number);
    }

    const renderFeedBoxComponents = () => {
        return props.storeQuestions.map(question => {
            return (
                <FeedBoxComponent key={question.id} question={question} questionContent={question.content} view={view} />
            )
        })
    }
    
    return(
        <div>
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <ThemeProvider theme={theme} >
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

export default connect(mapStateToProps, mapDispatchToProps)(RevatureQuestions);