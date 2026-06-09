import { apiClient } from '../api/apiClient';

export async function fetchPlantingList() {
    const response = await apiClient.get('/api/plantio/listar');

    return response.data;
}

export async function fetchPlantingById(plantingId) {
    const response = await apiClient.get(`/api/plantio/${plantingId}`);

    return response.data;
}