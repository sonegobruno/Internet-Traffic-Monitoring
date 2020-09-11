import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.sbsnet.com.br/velocidade/getssh',
});

export default api;
