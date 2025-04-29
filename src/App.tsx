import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import LoginPage from './pages/LoginPage';
import ProfileEditPage from './pages/ProfileEditPage';
import SignupPage from './pages/SignupPage';
import PostCreatePage from './pages/posts/PostCreatePage';
import PostDetailPage from './pages/posts/PostDetailPage';
import PostEditPage from './pages/posts/PostEditPage';
import PostListPage from './pages/posts/PostListPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

        {/* 회원 관련 */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.PROFILE_EDIT} element={<ProfileEditPage />} />

        {/* 게시글 관련 */}
        <Route path={ROUTES.POSTS.LIST} element={<PostListPage />} />
        <Route path={ROUTES.POSTS.CREATE} element={<PostCreatePage />} />
        <Route path={ROUTES.POSTS.EDIT()} element={<PostEditPage />} />
        <Route path={ROUTES.POSTS.DETAIL()} element={<PostDetailPage />} />
      </Routes>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
