import { apiClient } from '../api/apiClient';

export async function createUser(userData) {
    const response = await apiClient.post(
        '/api/usuario',
        userData
    );
    return response.data;
}

export async function fetchUserInfo() {
    const response = await apiClient.get(
        '/api/usuario/infos'
    );

    return response.data;
}

export async function updateUser(userId, userData) {
    const response = await apiClient.patch(
        `/api/usuario/${userId}`,
        userData
    );

    return response.data;
}

export async function deleteUser(userId) {
    await apiClient.delete(
        `/api/usuario/${userId}`
    );
}