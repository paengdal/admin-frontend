import { Navigate, Route, Routes } from 'react-router-dom';

// 페이지 임포트
import ProfileEditPage from './pages/ProfileEditPage';
import SignupPage from './pages/SignupPage';

import LoginPage from './pages/LoginPage';
import PostCreatePage from './pages/posts/PostCreatePage';
import PostDetailPage from './pages/posts/PostDetailPage';
import PostEditPage from './pages/posts/PostEditPage';
import PostListPage from './pages/posts/PostListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* 회원 관련 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile/edit" element={<ProfileEditPage />} />

      {/* 게시글 관련 */}
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/posts/new" element={<PostCreatePage />} />
      <Route path="/posts/:postId/edit" element={<PostEditPage />} />
      <Route path="/posts/:postId" element={<PostDetailPage />} />
    </Routes>
  );
}

export default App;
