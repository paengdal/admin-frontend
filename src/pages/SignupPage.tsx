import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import OutlinedButton from '../components/OutlinedButton';
import { ROUTES } from '../constants/routes';
import userApi from '../services/userApi';

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const signupMutation = useMutation({
    mutationFn: async () => {
      // 1. 회원가입 요청
      await userApi.signup({ email, nickname, password });

      // 2. 회원가입 성공하면 바로 로그인 요청
      await userApi.login({ nickname, password });
    },
    onSuccess: () => {
      // 3. 로그인까지 성공하면 게시글 목록 페이지로 이동
      navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      console.error('회원가입 또는 로그인 실패:', error);
    },
  });

  const { mutate: checkNickname } = useMutation({
    mutationFn: (data: string) => userApi.checkNickname(data),
    onSuccess: (data) => {
      alert(`${data.message}:${data.result}`);
    },
  });

  const { mutate: checkEmail } = useMutation({
    mutationFn: (data: string) => userApi.checkEmail(data),
    onSuccess: (data) => {
      alert(`${data.message}:${data.result}`);
    },
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  const handleCancel = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleCheckEmail = () => {
    console.log('이메일 중복 확인:', email);
    checkEmail(email);
  };

  const handleCheckNickname = () => {
    console.log('닉네임 중복 확인:', nickname);
    checkNickname(nickname);
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Email 입력 */}
          <div>
            <label htmlFor="email" className="block text-xl font-medium mb-2">
              Email
            </label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <OutlinedButton
                type="button"
                onClick={handleCheckEmail}
                className="w-[200px] px-4 text-base"
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
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <OutlinedButton
                type="button"
                onClick={handleCheckNickname}
                className="w-[200px] px-4 text-base"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              required
            />
          </div>

          {/* 하단 버튼 */}
          <div className="space-y-2">
            <OutlinedButton type="button" onClick={handleCancel}>
              가입 취소
            </OutlinedButton>
            <Button type="submit">회원가입</Button>
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
