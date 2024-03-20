import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chill-api.onrender.com',
});

api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        await api.post('/user/refreshToken',{
            refreshToken : localStorage.getItem("refreshToken")
        },{withCredentials:true})
        
        return api(originalConfig);
      }
    }
    return Promise.reject(error);
  }
);

export default api;