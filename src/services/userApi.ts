import { CreateUserDto } from '../types/dtos/user.dto';
import client from './client';

// user정보 가져오기
const getMyInfo = async () => {
  const url = '/users/myInfo';
  const response = await client.get(url);
  return response.data;
};

// 회원가입
const createUser = async (data: CreateUserDto) => {
  const url = '/users/create/user/email';
  const response = await client.post(url, data);
  return response.data;
};

const userApi = {
  getMyInfo,
  createUser,
};

export default userApi;
