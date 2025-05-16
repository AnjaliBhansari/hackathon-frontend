import api from './api';

export const get = () => api.get('/data');
export const post = (data) => api.post('/data', data);