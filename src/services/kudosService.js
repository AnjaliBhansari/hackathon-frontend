import api from './api';

export const getKudos = () => api.get('/kudos');
export const postKudos = (data) => api.post('/kudos', data);