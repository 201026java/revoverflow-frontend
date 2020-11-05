/**
@author
Jordon Hill
*/

import { authAxios } from './internal.axios'
import { Question} from '../models/question';
import { Answer } from '../models/answer';


export const postQuestion = async (question: Question) => {
    const response = await authAxios.post<Question>(`/questions`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const postAnswer = async (answer: Answer) => {
    const response = await authAxios.post<Answer>(`/answers`, answer);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const getAllQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<any>(`/questions?&size=${size}&page=${page}`);
    return response.data;
}

export const getQuestionsByUserId = async (id: number, size: number, page: number ) => {
    const response = await authAxios.get<Question[]>(`/questions/user/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getUnconfirmedQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<Question[]>(`questions/status/false?size=${size}&page=${page}`);
    return response.data;
}

export const getQuestionByQuestionId = async (id: number) => {
    const response = await authAxios.get<Question>(`/questions/id/${id}`);
    return response.data;
}

export const getAllFilteredQuestions = async (size: number, page: number, questionType: string, location: string) => {
    const response = await authAxios.get<any>(`/questions?&size=${size}&page=${page}&questionType=${questionType}&location=${location}`)
    return response.data;
}

export const updateQuestionAcceptedAnswerId = async (questionAcceptedAnswerId: Question) => {
    const response = await authAxios.put<Question>(`/questions`, questionAcceptedAnswerId);
    return response;
}

export const updateQuestionStatus = async (questionStatus: any) => {
    const response = await authAxios.put<Question>(`/questions/status`, questionStatus);
    return response;
}