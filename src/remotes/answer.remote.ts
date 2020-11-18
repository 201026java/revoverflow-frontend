/**
 * @author Jordon Hill
 * 
 * @Additions added a remote for filtering
 * @author Soksivateara Eng
*/

import { authAxios } from './internal.axios'
import { Question } from '../models/question';
import { Answer } from '../models/answer';

export const getAnswersByUserId = async (id: number, size: number, page: number) => {
    const response = await authAxios.get<Question[]>(`/answer/answer/user/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getAnswerByAnswerId = async (id: number) => {
    const response = await authAxios.get<Answer>(`/answer/answer/id/${id}`);
    return response.data;
}

export const getAnswersByQuestionId = async (id: number, size: number, page: number) => {
    const response = await authAxios.get<Question[]>(`/answer/answer/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getFilteredAnswers = async (id: number, size: number, page: number, questionType: string, location: string) => {
    const response = await authAxios.get<Question[]>(`/answer/answer/filter?id=${id}&size=${size}&page=${page}&questionType=${questionType}&location=${location}`);
    return response.data;
}