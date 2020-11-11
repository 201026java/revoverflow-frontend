/**
@author
Jordon Hill
*/

import { internalAxios } from './internal.axios'
import { Question} from '../models/question';
import { Answer } from '../models/answer';


export const postQuestion = async (question: Question) => {
    const response = await internalAxios.post<Question>(`/question`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const postAnswer = async (answer: Answer) => {
    const response = await internalAxios.post<Answer>(`/answer`, answer);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const getAllQuestions = async (size: number, page: number) => {
    const response = await internalAxios.get<any>(`/question?&size=${size}&page=${page}`);
    return response.data;
}

export const hello = async () => {
    const response = await internalAxios.get<any>(`/question/hello`);
    return response.data;
}

export const getQuestionsByUserId = async (id: number, size: number, page: number ) => {
    const response = await internalAxios.get<Question[]>(`/question/user/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getUnconfirmedQuestions = async (size: number, page: number) => {
    const response = await internalAxios.get<Question[]>(`/question/status/false?size=${size}&page=${page}`);
    return response.data;
}

export const getQuestionByQuestionId = async (id: number) => {
    const response = await internalAxios.get<Question>(`/question/id/${id}`);
    return response.data;
}

export const updateQuestionAcceptedAnswerId = async (questionAcceptedAnswerId: Question) => {
    const response = await internalAxios.put<Question>(`/question`, questionAcceptedAnswerId);
    return response;
}

export const updateQuestionStatus = async (questionStatus: any) => {
    const response = await internalAxios.put<Question>(`/question/status`, questionStatus);
    return response;
}

export const getAllFilteredQuestions = async (id: number, size: number, page: number, questionType: string, location: string) => {
    const response = await internalAxios.get<any>(`/question/filter?size=${size}&page=${page}&questionType=${questionType}&location=${location}&id=${id}`)
    return response.data;
}

export const getFilteredQuestionsByUserId = async (id: number, size: number, page: number, questionType: string, location: string ) => {
    const response = await internalAxios.get<Question[]>(`/question/user/${id}?size=${size}&page=${page}&questionType=${questionType}&location=${location}`);
    return response.data;
}

export const getFilteredUnconfirmedQuestions = async (size: number, page: number, questionType: string, location: string) => {
    const response = await internalAxios.get<Question[]>(`question/status/false?size=${size}&page=${page}&questionType=${questionType}&location=${location}`);
    return response.data;
}