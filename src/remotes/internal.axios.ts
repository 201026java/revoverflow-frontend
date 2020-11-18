/**
 * @file Setting up connection configs to server-side
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import Axios from "axios";

const server = process.env.REACT_APP_API_URL ?? "http://a05ca03ed94f848dfa2d6ef975d395ff-284278107.us-east-1.elb.amazonaws.com";

export const internalAxios = Axios.create({
    baseURL: server,
});

export const authAxios = Axios.create({
    baseURL: server,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
});
