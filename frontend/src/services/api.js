import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: `${API_URL}/api/password`
});

// espera um objeto com 'options' e 'deviceId'
export const generatePasswordAPI = (data) => api.post('/generate', data);

// espera o deviceId para colocar na URL
export const getHistoryAPI = (deviceId) => api.get(`/history/${deviceId}`);