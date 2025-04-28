import axios from 'axios';

// localStorage에서 accessToken 가져오기
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  // withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    const AUTH_WHITELIST = ['/login', '/signup'];
    const isAuthPath = AUTH_WHITELIST.some((path) =>
      config.url?.includes(path)
    );

    if (accessToken && !isAuthPath) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
