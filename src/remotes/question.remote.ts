/**
 * @author Jordon Hill
 * 
 * @Additions added remotes for filtering
 * @author Soksivateara Eng
*/

import { authAxios } from './internal.axios'
import { Question} from '../models/question';
import { Answer } from '../models/answer';


export const postQuestion = async (question: Question) => {
    const response = await authAxios.post<Question>(`/question/question`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const postAnswer = async (answer: Answer) => {
    const response = await authAxios.post<Answer>(`/answer/answer`, answer);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const getAllQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<any>(`/question/question?&size=${size}&page=${page}`);
    return response.data;
}

export const getQuestionsByUserId = async (id: number, size: number, page: number ) => {
    const response = await authAxios.get<Question[]>(`/question/question/user/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getUnconfirmedQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<Question[]>(`/question/question/status/false?size=${size}&page=${page}`);
    return response.data;
}

export const getQuestionByQuestionId = async (id: number) => {
    const response = await authAxios.get<Question>(`/question/question/id/${id}`);
    return response.data;
}

export const updateQuestionAcceptedAnswerId = async (questionAcceptedAnswerId: Question) => {
    const response = await authAxios.put<Question>(`/question/question`, questionAcceptedAnswerId);
    return response;
}

export const updateQuestionStatus = async (questionStatus: any) => {
    const response = await authAxios.put<Question>(`/question/question/status`, questionStatus);
    return response;
}

export const getAllFilteredQuestions = async (id: number, size: number, page: number, questionType: string, location: string) => {
    const response = await authAxios.get<any>(`/question/question/filter?size=${size}&page=${page}&questionType=${questionType}&location=${location}&id=${id}`)
    return response.data;
}

export const getFilteredUnconfirmedQuestions = async (id: number, size: number, page: number, questionType: string, location: string) => {
    const response = await authAxios.get<Question[]>(`/question/question/unconfirmed/filter?size=${size}&page=${page}&questionType=${questionType}&location=${location}&id=${id}`);
    return response.data;
}