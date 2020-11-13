/**
 * @author Jordon Hill
 * 
 * @Additions added a remote for filtering
 * @author Soksivateara Eng
*/

import { internalAxios } from './internal.axios'
import { Question } from '../models/question';
import { Answer } from '../models/answer';

export const getAnswersByUserId = async (id: number, size: number, page: number) => {
    const response = await internalAxios.get<Question[]>(`/answer/user/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getAnswerByAnswerId = async (id: number) => {
    const response = await internalAxios.get<Answer>(`/answer/id/${id}`);
    return response.data;
}

export const getAnswersByQuestionId = async (id: number, size: number, page: number) => {
    const response = await internalAxios.get<Question[]>(`/answer/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getFilteredAnswers = async (id: number, size: number, page: number, questionType: string, location: string) => {
    const response = await internalAxios.get<Question[]>(`/answer/filter?id=${id}&size=${size}&page=${page}&questionType=${questionType}&location=${location}`);
    return response.data;
}