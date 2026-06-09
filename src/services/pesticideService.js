import { apiClient } from '../api/apiClient';

export async function fetchPesticideList() {
    const response = await apiClient.get(
        '/api/defensivo/listar'
    );

    return response.data;
}

export async function fetchPesticidesByType(typeName) {
    const response = await apiClient.get(
        `/api/defensivo/tipo/${typeName}`
    );

    return response.data;
}

export async function fetchPlantingsByPesticide(pesticideId) {
    const response = await apiClient.get(
        `/api/plantio/tipoDefensivo/${pesticideId}`
    );

    return response.data;
}