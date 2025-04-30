// hooks/useCheckEmail.ts
import { useMutation } from '@tanstack/react-query';
import userApi from '../services/userApi';

export function useCheckEmailMutation(
  onChecked: (isAvailable: boolean) => void
) {
  return useMutation({
    mutationFn: (email: string) => userApi.checkEmail(email),
    onSuccess: (data) => {
      if (data.result) {
        alert('이미 사용 중인 이메일입니다.');
        onChecked(false);
      } else {
        alert('사용 가능한 이메일입니다.');
        onChecked(true);
      }
    },
    onError: () => {
      alert('이메일 확인 중 오류가 발생했습니다.');
      onChecked(false);
    },
  });
}
