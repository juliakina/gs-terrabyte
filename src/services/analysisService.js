import { apiClient } from '../api/apiClient';

export async function fetchAnalysisList() {
    const response = await apiClient.get('/api/analise/listar');

    return response.data;
}

export async function fetchAnalysisById(analysisId) {
    const response = await apiClient.get(`/api/analise/${analysisId}`);

    return response.data;
}

export async function createAnalysis(addressId, plantingId) {
    const response = await apiClient.post('/api/analise', null, {
        params: {
            idEndereco: addressId,
            idPlantio: plantingId,
        },
    });

    return response.data;
}