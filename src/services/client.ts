import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ex. http://localhost:3000/api
  withCredentials: true, // 필요하면 쿠키 보낼 수 있게
});

export default client;
