import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import OutlinedButton from '../components/OutlinedButton';
import userApi from '../services/userApi';
import { SignupDto } from '../types/dtos/user.dto';

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const { mutate: signup } = useMutation({
    mutationFn: (data: SignupDto) => userApi.signup(data),
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ email, nickname, password });
    console.log('회원가입 시도:', { email, nickname, password, checkPassword });
  };

  const handleCancel = () => {
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCheckEmail = () => {
    console.log('이메일 중복 확인:', email);
    // TODO: 이메일 중복 확인 API 연동
  };

  const handleCheckNickname = () => {
    console.log('닉네임 중복 확인:', nickname);
    // TODO: 닉네임 중복 확인 API 연동
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
