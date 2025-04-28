import { LoginDto, SignupDto } from '../types/dtos/user.dto';
import client from './client';

// user정보 가져오기
const getMyInfo = async () => {
  const url = '/users/myInfo';
  const response = await client.get(url);
  return response.data;
};

// 회원가입
const signup = async (data: SignupDto) => {
  const url = '/users/create/user/email';
  const response = await client.post(url, data);
  return response.data;
};

// 로그인
const login = async (data: LoginDto) => {
  const url = '/users/nickname/login';
  const response = await client.post(url, data);
  console.log(response);
  return response;
};

// 닉네임 중복 확인
const checkNickname = async (nickname: string) => {
  const url = `/users/check/nickname/exist/${nickname}`;
  const response = await client.get(url);
  return response.data;
};

// 이메일 중복 확인
const checkEmail = async (email: string) => {
  const url = `/users/check/email/exist?email=${email}`;
  const response = await client.get(url);
  return response.data;
};

const userApi = {
  getMyInfo,
  signup,
  login,
  checkNickname,
  checkEmail,
};

export default userApi;
