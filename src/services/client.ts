import axios from 'axios';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  // withCredentials: true,
});

// Authorization 제외할 경로 리스트
const AUTH_WHITELIST = [
  '/login',
  '/signup',
  '/users/check/nickname/exist',
  '/users/check/email/exist',
];

client.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    const isAuthPath = AUTH_WHITELIST.some((path) =>
      config.url?.startsWith(path)
    );

    if (accessToken && !isAuthPath) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
