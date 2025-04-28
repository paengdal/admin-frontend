import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { AxiosError } from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import OutlinedButton from '../components/OutlinedButton';
import { ROUTES } from '../constants/routes';
import { loginSchema } from '../schemas/schemas';
import userApi from '../services/userApi';

type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // 중요: 입력 즉시 검증
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
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
        alert('로그인 중 오류가 발생했습니다.');
      }
    },
  });

  const handleLogin = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const handleSignupNavigate = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Nickname 입력 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-xl font-medium mb-2"
            >
              Nickname
            </label>
            <Input
              id="nickname"
              type="text"
              {...register('nickname')}
              error={errors.nickname?.message}
              required
            />
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

          {/* 로그인 버튼 */}
          <Button type="submit" disabled={!isValid}>
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
          {/* 회원가입 하러 가기 버튼 */}
          <OutlinedButton type="button" onClick={handleSignupNavigate}>
            회원가입
          </OutlinedButton>
        </form>
      </div>
    </Layout>
  );
}

export default LoginPage;
