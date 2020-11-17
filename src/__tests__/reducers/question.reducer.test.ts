import { QuestionActionPayload, QuestionsActionPayload, QuestionConfirmActionPayload, questionActionTypes, } from '../../actions/question.actions';
import { Action } from 'redux';
import { questionReducer } from '../../reducers/question.reducer';

describe('quesiton.reducer', () => {
    describe('CLICK_QUESTION', () => {
        test('should persist the question in the redux store', () => {
            const action: QuestionActionPayload & QuestionsActionPayload & QuestionConfirmActionPayload & Action = {
                type: questionActionTypes.CLICK_QUESTION,
                payload: {
                    question: {
                        id: 99,
                        acceptedId: 0,
                        title: "title99",
                        content: "content99",
                        creationDate: new Date("2020-01-01"),
                        status: false,
                        userID: 99,
                        questionType: "Revature",
                        location: "Texas"
                    },
                    questions: [],
                    tab: 0,
                    pageCount: 0,
                    page: 0,
                    confirm: false

                }
            }

            const state = {
                collectedQuestions: [],
                storeQuestion: {
                    id: 1,
                    acceptedId: 0,
                    title: "title1",
                    content: "content",
                    creationDate: new Date(),
                    status: false,
                    userID: 1,
                    questionType: "Revature",
                    location: "Texas"
                },
                storeTab: 0,
                storePageCount: 0,
                storePage: 0,
                confirm: false
            }

            const nextState = questionReducer(state, action);
            expect(nextState.storeQuestion).toMatchObject({
                id: 99,
                acceptedId: 0,
                title: "title99",
                content: "content99",
                creationDate: new Date("2020-01-01"),
                status: false,
                userID: 99
            });
        });
    });

    describe('POST_QUESTION', () => {
        test('should add the new question to the collected questions in the redux store', () => {
            const action: QuestionActionPayload & QuestionsActionPayload & QuestionConfirmActionPayload & Action = {
                type: questionActionTypes.POST_QUESTION,
                payload: {
                    question: {
                        id: 99,
                        acceptedId: 0,
                        title: "title99",
                        content: "content99",
                        creationDate: new Date("2020-01-01"),
                        status: false,
                        userID: 99,
                        questionType: "Revature",
                        location: "Texas"
                    },
                    questions: [],
                    tab: 0,
                    pageCount: 0,
                    page: 0,
                    confirm: false
                }
            }

            const state = {
                collectedQuestions: [],
                storeQuestion: {
                    id: 1,
                    acceptedId: 0,
                    title: "title1",
                    content: "content",
                    creationDate: new Date(),
                    status: false,
                    userID: 1,
                    questionType: "Revature",
                    location: "Texas"
                },
                storeTab: 0,
                storePageCount: 0,
                storePage: 0,
                confirm: false
            }

            const nextState = questionReducer(state, action);
            expect(nextState.collectedQuestions).toEqual([{
                id: 99,
                acceptedId: 0,
                title: "title99",
                content: "content99",
                creationDate: new Date("2020-01-01"),
                status: false,
                userID: 99,
                questionType: "Revature",
                location: "Texas"
            }]);
        });
    });


});