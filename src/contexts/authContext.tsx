import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import client from '../services/client';

// 유저 타입
export type User = {
  id: number;
  email: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
};

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isAuthInitialized: boolean;
  logIn: (user: User) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// useAuth 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setIsAuthInitialized(true);
      return;
    }

    (async () => {
      try {
        const res = await client.get<{ result: User }>('/users/myInfo');
        setUser(res.data.result);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('자동 로그인 실패:', error);
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsAuthInitialized(true);
      }
    })();
  }, []);

  // 로그인 상태 확인 및 리다이렉트 처리
  useEffect(() => {
    if (!isAuthInitialized) return;

    // 로그아웃 상태에서 로그인/회원가입 외의 페이지에 있으면 로그인 페이지로 보냄
    const publicPaths = [ROUTES.LOGIN, ROUTES.SIGNUP];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (!isLoggedIn && !isPublicPath) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthInitialized, isLoggedIn, location.pathname, navigate]);

  const logIn = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    setIsAuthInitialized(true);
  };

  const logOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsAuthInitialized(true);
    localStorage.removeItem('accessToken');
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const value: AuthContextValue = {
    user,
    isLoggedIn,
    isAuthInitialized,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
