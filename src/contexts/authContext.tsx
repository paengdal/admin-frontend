import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import userApi from '../services/userApi';
// 유저 타입
export type User = {
  id: number;
  email: string;
  nickname: string;
  created_at: string;
  updated_at: string;
};

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isAuthInitialized: boolean;
  logout: () => void;
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
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const userData = await userApi.getMyInfo();
      console.log(userData);
      return userData;
    },
    staleTime: Infinity,
  });

  const isLoggedIn = !!user;
  const isAuthInitialized = !isLoading;

  // 로그인 상태 확인 및 리다이렉트 처리
  useEffect(() => {
    if (isAuthInitialized) {
      const publicPaths = [ROUTES.LOGIN, ROUTES.SIGNUP];
      const isPublicPath = publicPaths.includes(location.pathname);

      if (!isLoggedIn && !isPublicPath) {
        navigate(ROUTES.LOGIN, { replace: true });
      }
    }
  }, [isAuthInitialized, isLoggedIn, location.pathname, navigate]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    queryClient.removeQueries({ queryKey: ['me'] });
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const value: AuthContextValue = {
    user: user || null,
    isLoggedIn,
    isAuthInitialized,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
