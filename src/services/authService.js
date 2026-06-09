import { apiClient } from '../api/apiClient';

export async function loginUser(email, password) {
    const response = await apiClient.post('/auth/login', null, {
        params: {
            email,
            senha: password,
        },
    });

    return response.data;
}