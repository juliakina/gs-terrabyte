import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://terrabyte-api-4sxj.onrender.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export function setAuthToken(accessToken) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}