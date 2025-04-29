import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Layout from '../components/atoms/Layout';
import OutlinedButton from '../components/atoms/OutlinedButton';
import userApi from '../services/userApi';

// 수정용 스키마: password 입력 시 6자리 이상 + checkPassword 일치 검증
const editProfileSchema = z
  .object({
    nickname: z.string().optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: '비밀번호는 6자 이상이어야 합니다.',
      }),
    checkPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.checkPassword && data.password === data.checkPassword;
      }
      return true;
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['checkPassword'],
    }
  );

type EditProfileForm = z.infer<typeof editProfileSchema>;

function ProfileEditPage() {
  const navigate = useNavigate();
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: userApi.getMyInfo,
  });
  console.log(user);

  const nickname = watch('nickname');
  const password = watch('password');

  const hasNickname = !!nickname;
  const hasPassword = !!password;

  // nickname 입력됐으면 -> 중복확인 성공했는지 체크
  const isNicknameValid = hasNickname ? isNicknameChecked : false;

  // 버튼 활성화 조건
  const isFormReady =
    ((hasNickname && isNicknameValid) || hasPassword) && isValid;

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (
      data: Partial<{ nickname: string; password: string }>
    ) => {
      return await userApi.updateProfile(data);
    },
    onSuccess: (data) => {
      alert('프로필이 수정되었습니다.');
      console.log(data);
      // navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message || '프로필 수정 실패');
      } else {
        alert('예상치 못한 에러가 발생했습니다.');
      }
    },
  });

  const { mutate: checkNickname } = useMutation({
    mutationFn: (nickname: string) => userApi.checkNickname(nickname),
    onSuccess: (data) => {
      if (data.result) {
        alert('이미 사용 중인 닉네임입니다.');
        setIsNicknameChecked(false);
      } else {
        alert('사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      }
    },
    onError: () => {
      alert('닉네임 확인 중 오류가 발생했습니다.');
      setIsNicknameChecked(false);
    },
  });

  const onSubmit = (data: EditProfileForm) => {
    const payload: { nickname?: string; password?: string } = {};

    if (data.nickname) payload.nickname = data.nickname;
    if (data.password) payload.password = data.password;

    if (Object.keys(payload).length === 0) {
      alert('변경할 내용을 입력하세요.');
      return;
    }

    updateProfile(payload);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCheckNickname = () => {
    const nickname = getValues('nickname');
    if (nickname) {
      checkNickname(nickname);
    } else {
      alert('닉네임을 입력하세요.');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">내 정보 수정</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nickname 입력 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-xl font-medium mb-2"
            >
              Nickname
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="nickname"
                  type="text"
                  {...register('nickname', {
                    onChange: () => setIsNicknameChecked(false),
                  })}
                  error={errors.nickname?.message}
                />
              </div>
              <OutlinedButton
                type="button"
                className="!w-[150px] px-4 !text-base"
                onClick={handleCheckNickname}
              >
                닉네임 확인
              </OutlinedButton>
            </div>
          </div>

          {/* Password 입력 */}
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-medium mb-2"
            >
              New Password
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>

          {/* Check Password 입력 */}
          <div>
            <label
              htmlFor="checkPassword"
              className="block text-xl font-medium mb-2"
            >
              Check New Password
            </label>
            <Input
              id="checkPassword"
              type="password"
              {...register('checkPassword')}
              error={errors.checkPassword?.message}
            />
          </div>

          {/* 하단 버튼 */}
          <div className="space-y-2">
            <OutlinedButton type="button" onClick={handleCancel}>
              변경 취소
            </OutlinedButton>
            <Button type="submit" disabled={!isFormReady}>
              변경
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ProfileEditPage;
