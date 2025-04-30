// hooks/useSignup.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { SignupForm } from '../pages/SignupPage';
import userApi from '../services/userApi';

export function useSignupMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupForm) => {
      await userApi.signup({
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      });
      await userApi.login({
        nickname: data.nickname,
        password: data.password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error('서버 응답:', error.response?.data);
        alert(error.response?.data.message || '로그인 실패');
      } else {
        console.error('예상치 못한 에러:', error);
        alert('회원가입/로그인 중 오류가 발생했습니다.');
      }
    },
  });
}
