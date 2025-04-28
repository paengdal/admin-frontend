import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import client from '../services/client'; // axios 인스턴스 사용

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

// context 만들기 (초기값 명확히 세팅)
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// useAuth 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider 컴포넌트
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // 최초 로딩 시 accessToken 있는지 확인하고 유저 정보 요청
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setIsAuthInitialized(true);
      return;
    }

    (async () => {
      try {
        const res = await client.get<{ result: User }>('/users/myInfo');
        setUser(res.data.result); // result 안의 유저 데이터만 저장
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
