// hooks/useLogin.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { LoginForm } from '../pages/LoginPage';
import userApi from '../services/userApi';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginForm) => {
      return await userApi.login({
        nickname: data.nickname,
        password: data.password,
      });
    },
    onSuccess: async (data) => {
      console.log(data);
      /**
       * invalidateQueried보다는 상태 보장이 확실하고 옵션과 무관한 refetchQueries가 더 적절
       * login 요청의 응답으로 user가 오는 상황이라면 setQueryData가 가장 베스트
       * - fetch없이 응답값으로 빠르고 확정적으로 user 세팅
       */
      queryClient.refetchQueries({ queryKey: ['me'] });
      navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error('서버 응답:', error.response?.data);
        alert(error.response?.data.message || '로그인 실패');
      } else {
        console.error('예상치 못한 에러:', error);
        alert('로그인 중 오류가 발생했습니다.');
      }
    },
  });
}
