import { apiClient } from '../api/apiClient';

export async function createUser(userData) {
    const response = await apiClient.post(
        '/api/usuario',
        userData
    );
    return response.data;
}