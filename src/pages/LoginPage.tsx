import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import OutlinedButton from '../components/OutlinedButton';
import { ROUTES } from '../constants/routes';
import userApi from '../services/userApi';
import { LoginDto } from '../types/dtos/user.dto';

function LoginPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ nickname, password });
    console.log('로그인 시도:', { nickname, password });
  };

  const { mutate: login } = useMutation({
    mutationFn: (data: LoginDto) => userApi.login(data),
    onSuccess: (data) => {
      console.log('data', data);
      navigate(ROUTES.POSTS.LIST);
    },
  });

  const handleSignup = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Nickname
            </label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
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

          <Button type="submit">로그인</Button>

          <OutlinedButton type="button" onClick={handleSignup}>
            회원가입
          </OutlinedButton>
        </form>
      </div>
    </Layout>
  );
}

export default LoginPage;
