/**
 * @file Defining remote for authentication
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import { authAxios, internalAxios } from './internal.axios';
import { Login } from '../models/login';
import { user } from '../models/user';


export const checkLoginCredentials = async (login: Login) => {
    const response = await internalAxios.post('/user/user/login', login)
    return response;
}

export const getUserById = async (id: number) => {
    const response = await authAxios.get<user>(`/user/user/${id}`);
    return response;
}