import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Layout from '../components/atoms/Layout';
import LoginButtons from '../components/organisms/LoginButtons';
import LoginInputSection from '../components/organisms/LoginInputSection';
import { ROUTES } from '../constants/routes';
import { useLoginMutation } from '../hooks/useLogin';
import { loginSchema } from '../schemas/schemas';

export type LoginForm = z.infer<typeof loginSchema>;

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

  // 로그인
  const loginMutation = useLoginMutation();
  const handleLogin = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  // 회원가입 페이지로 이동
  const handleSignupNavigate = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <LoginInputSection register={register} errors={errors} />
          <LoginButtons
            isValid={isValid}
            isPending={loginMutation.isPending}
            onSignup={handleSignupNavigate}
          />
        </form>
      </div>
    </Layout>
  );
}

export default LoginPage;
