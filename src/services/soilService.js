import { apiClient } from '../api/apiClient';

export async function fetchSoilList() {
    const response = await apiClient.get(
        '/api/tipoSolo/listar'
    );

    return response.data;
}

export async function fetchPlantingsBySoil(soilId) {
    const response = await apiClient.get(
        `/api/plantio/solo/${soilId}`
    );

    return response.data;
}