import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

// api.interceptors.request.use(async config => {
//     // Declaramos um token manualmente para teste.
//     const token = sessionStorage.token;

//     if (token) {
//         api.defaults.headers.authorization = `Bearer ${token}`;
//     }

//     return config;
// });

export default api
