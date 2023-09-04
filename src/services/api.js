import axios from 'axios';

const api = axios.create({
    baseURL : "https://localhost:7083",
    // baseURL : "https://localhost:44370",
})

export default api;