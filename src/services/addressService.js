import { apiClient } from '../api/apiClient';

export async function createAddress(addressData) {
    const response = await apiClient.post(
        '/api/endereco',
        addressData
    );

    return response.data;
}

export async function fetchAddressList() {
    const response = await apiClient.get(
        '/api/endereco/listar'
    );

    return response.data;
}

export async function fetchAddressById(addressId) {
    const response = await apiClient.get(
        `/api/endereco/${addressId}`
    );

    return response.data;
}

export async function deleteAddress(addressId) {
    const response = await apiClient.delete(
        `/api/endereco/${addressId}`
    );

    return response.data;
}