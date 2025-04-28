import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { AxiosError } from 'axios';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import OutlinedButton from '../components/OutlinedButton';
import { ROUTES } from '../constants/routes';
import { signupSchema } from '../schemas/schemas';
import userApi from '../services/userApi';

type SignupForm = z.infer<typeof signupSchema>;

function SignupPage() {
  const navigate = useNavigate();
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const signupMutation = useMutation({
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

  const { mutate: checkEmail } = useMutation({
    mutationFn: (email: string) => userApi.checkEmail(email),
    onSuccess: (data) => {
      if (data.result) {
        alert('이미 사용 중인 이메일입니다.');
        setIsEmailChecked(false);
      } else {
        alert('사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      }
    },
    onError: () => {
      alert('이메일 확인 중 오류가 발생했습니다.');
      setIsEmailChecked(false);
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

  const handleSignup = (data: SignupForm) => {
    signupMutation.mutate(data);
  };

  const handleCancel = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleCheckEmail = () => {
    const email = getValues('email');
    if (email) {
      checkEmail(email);
    } else {
      alert('이메일을 먼저 입력하세요.');
    }
  };

  const handleCheckNickname = () => {
    const nickname = getValues('nickname');
    if (nickname) {
      checkNickname(nickname);
    } else {
      alert('닉네임을 먼저 입력하세요.');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
          {/* Email 입력 */}
          <div>
            <label htmlFor="email" className="block text-xl font-medium mb-2">
              Email
            </label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                {...register('email', {
                  onChange: () => setIsEmailChecked(false),
                })}
                error={errors.email?.message}
                required
              />

              <OutlinedButton
                type="button"
                className="w-[200px] px-4 text-base"
                onClick={handleCheckEmail}
              >
                이메일 확인
              </OutlinedButton>
            </div>
          </div>

          {/* Nickname 입력 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-xl font-medium mb-2"
            >
              Nickname
            </label>
            <div className="flex gap-2">
              <Input
                id="nickname"
                type="text"
                {...register('nickname', {
                  onChange: () => setIsNicknameChecked(false),
                })}
                error={errors.nickname?.message}
                required
              />

              <OutlinedButton
                type="button"
                className="w-[200px] px-4 text-base"
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
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              required
            />
          </div>

          {/* Check Password 입력 */}
          <div>
            <label
              htmlFor="checkPassword"
              className="block text-xl font-medium mb-2"
            >
              Check Password
            </label>
            <Input
              id="checkPassword"
              type="password"
              {...register('checkPassword')}
              error={errors.checkPassword?.message}
              required
            />
          </div>

          {/* 하단 버튼 */}
          <div className="space-y-2">
            <OutlinedButton type="button" onClick={handleCancel}>
              가입 취소
            </OutlinedButton>
            <Button
              type="submit"
              disabled={!(isValid && isEmailChecked && isNicknameChecked)}
            >
              {signupMutation.isPending ? '회원가입 중...' : '회원가입'}
            </Button>
            <OutlinedButton type="button" onClick={handleLogin}>
              로그인하러 가기
            </OutlinedButton>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default SignupPage;
