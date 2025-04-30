// hooks/useCheckNickname.ts
import { useMutation } from '@tanstack/react-query';
import userApi from '../services/userApi';

export function useCheckNicknameMutation(
  onChecked: (isAvailable: boolean) => void
) {
  return useMutation({
    mutationFn: (nickname: string) => userApi.checkNickname(nickname),
    onSuccess: (data) => {
      if (data.result) {
        alert('이미 사용 중인 닉네임입니다.');
        onChecked(false);
      } else {
        alert('사용 가능한 닉네임입니다.');
        onChecked(true);
      }
    },
    onError: () => {
      alert('닉네임 확인 중 오류가 발생했습니다.');
      onChecked(false);
    },
  });
}
