import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Layout from '../components/atoms/Layout';
import EmailInputSection from '../components/organisms/EmailInputSection';
import NicknameInputSection from '../components/organisms/NicknameInputSection';
import PasswordInputSection from '../components/organisms/PasswordInputSection';
import SignupButtons from '../components/organisms/SignupButtons';
import { ROUTES } from '../constants/routes';
import { useCheckEmailMutation } from '../hooks/useCheckEmail';
import { useCheckNicknameMutation } from '../hooks/useCheckNickname';
import { useSignupMutation } from '../hooks/useSignup';
import { signupSchema } from '../schemas/schemas';

export type SignupForm = z.infer<typeof signupSchema>;

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

  // 회원가입 실행
  const signupMutation = useSignupMutation();
  const handleSignup = (data: SignupForm) => {
    signupMutation.mutate(data);
  };

  // 이메일 확인
  const { mutate: checkEmail } = useCheckEmailMutation(setIsEmailChecked);
  const handleCheckEmail = () => {
    const email = getValues('email');
    if (email) {
      checkEmail(email);
    } else {
      alert('이메일을 먼저 입력하세요.');
    }
  };

  // 닉네임 확인
  const { mutate: checkNickname } =
    useCheckNicknameMutation(setIsNicknameChecked);
  const handleCheckNickname = () => {
    const nickname = getValues('nickname');
    if (nickname) {
      checkNickname(nickname);
    } else {
      alert('닉네임을 먼저 입력하세요.');
    }
  };

  // 회원 가입 취소
  const handleCancel = () => {
    navigate(ROUTES.LOGIN);
  };

  // 로그인 페이지로 이동
  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
          <EmailInputSection
            register={register}
            errors={errors}
            onCheckEmail={handleCheckEmail}
          />
          <NicknameInputSection
            register={register}
            errors={errors}
            onCheckNickname={handleCheckNickname}
          />
          <PasswordInputSection register={register} errors={errors} />
          <SignupButtons
            isValid={isValid}
            isEmailChecked={isEmailChecked}
            isNicknameChecked={isNicknameChecked}
            isPending={signupMutation.isPending}
            onCancel={handleCancel}
            onLogin={handleLogin}
          />
        </form>
      </div>
    </Layout>
  );
}

export default SignupPage;
