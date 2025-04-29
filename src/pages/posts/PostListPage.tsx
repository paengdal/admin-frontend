import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import Layout from '../../components/atoms/Layout';
import OutlinedButton from '../../components/atoms/OutlinedButton';
import { useAuth } from '../../contexts/authContext';
import postApi from '../../services/postApi';
import { PostListResponse } from '../../types/dtos/profile.dto'; //

const POSTS_PER_PAGE = 5;

function PostListPage() {
  const navigate = useNavigate();
  const { user, logout: logOut } = useAuth();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  const { data: posts, isLoading } = useQuery<PostListResponse>({
    queryKey: ['posts', { keyword: searchKeyword, skip }],
    queryFn: () => {
      if (searchKeyword) {
        return postApi.searchPostList({
          keyword: searchKeyword,
          skip,
          take: POSTS_PER_PAGE,
          order: 'DESC',
        });
      } else {
        return postApi.getPostList({
          skip,
          take: POSTS_PER_PAGE,
          order: 'DESC',
        });
      }
    },
    placeholderData: (previousData) => previousData,
  });

  const handleSearch = () => {
    setSearchKeyword(inputValue.trim());
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleRowClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleWritePost = () => {
    navigate('/post/create');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleLogout = () => {
    logOut();
  };

  if (posts) {
    console.log(posts);
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-center">자유 게시판</h1>

      {/* 검색창 */}
      <div className="relative flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 rounded"
          placeholder="검색어를 입력하세요"
        />
        <OutlinedButton
          type="button"
          onClick={handleSearch}
          className="!w-[100px] !text-base"
        >
          검색
        </OutlinedButton>
      </div>

      {/* 게시글 테이블 */}
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100 h-16">
            <th className="p-2 border w-[57%]">제목</th>
            <th className="p-2 border w-[13%]">닉네임</th>
            <th className="p-2 border w-[10%]">조회수</th>
            <th className="p-2 border w-[20%]">업로드 날짜</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && posts?.result && posts?.result?.length > 0 ? (
            posts?.result.map((post) => (
              <tr
                key={post.id}
                className="h-16 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(post.id)}
              >
                <td className="p-2 border">{post.title}</td>
                <td className="p-2 border text-center">
                  {user?.id === post.id && (
                    <button
                      className="text-xs text-blue-500 mr-2 underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/post/edit/${post.id}`);
                      }}
                    >
                      수정
                    </button>
                  )}
                  {post.nickname}
                </td>
                <td className="p-2 border text-center">{post.watch}</td>
                <td className="p-2 border text-center">
                  {dayjs(post.created_at).format('YYYY.MM.DD HH:mm:ss')}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                {isLoading
                  ? '로딩 중...'
                  : searchKeyword
                  ? '검색 결과가 없습니다.'
                  : '게시글이 없습니다.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2 mb-6">
        {currentPage > 1 && (
          <OutlinedButton onClick={() => setCurrentPage((p) => p - 1)}>
            이전
          </OutlinedButton>
        )}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border text-sm font-bold bg-blue-100">
          {currentPage}
        </div>
        {posts?.result?.length === POSTS_PER_PAGE && (
          <OutlinedButton onClick={() => setCurrentPage((p) => p + 1)}>
            다음
          </OutlinedButton>
        )}
      </div>

      {/* 하단 메뉴 */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <OutlinedButton onClick={handleEditProfile} className="!w-[150px]">
            내정보
          </OutlinedButton>
          <OutlinedButton onClick={handleLogout} className="!w-[150px]">
            로그아웃
          </OutlinedButton>
        </div>
        <div>
          <Button onClick={handleWritePost} className="!w-[150px]">
            글 작성
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default PostListPage;
