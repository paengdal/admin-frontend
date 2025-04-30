import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import userApi from '../services/userApi';

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: Partial<{ nickname: string; password: string }>) =>
      await userApi.updateProfile(data),
    onSuccess: () => {
      alert('프로필이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message || '프로필 수정 실패');
      } else {
        alert('예상치 못한 에러가 발생했습니다.');
      }
    },
  });
}
