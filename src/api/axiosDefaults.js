import axios from "axios";

axios.defaults.baseURL = 'https://memovault-api-2cb24ac3e7ac.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;


export const axiosReq = axios.create();
export const axiosRes = axios.create();
