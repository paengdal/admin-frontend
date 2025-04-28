import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

// 레이아웃용 공통 컴포넌트
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-8">
      <div className="w-full max-w-[900px] px-4">{children}</div>
    </div>
  );
}

export default Layout;
