import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Layout from '../../components/atoms/Layout';
import OutlinedButton from '../../components/atoms/OutlinedButton';
import { ROUTES } from '../../constants/routes';
import { postSchema } from '../../schemas/schemas';
import postApi from '../../services/postApi';
import { CreatePostDto, UpdatePostDto } from '../../types/dtos/post.dto';

function PostEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams<{ postId: string }>();
  const [watch, setWatch] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreatePostDto>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
  });

  // 게시글 조회
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', { postId }],
    queryFn: () => postApi.getPost(postId!),
  });

  // 게시글 정보 초깃값 세팅
  useEffect(() => {
    if (post) {
      reset({
        title: post.result.title,
        post: post.result.post,
      });
      setWatch(post.result.watch);
    }
  }, [post, reset]);

  // 게시글 수정
  const updatePostMutation = useMutation({
    mutationFn: (data: UpdatePostDto) => postApi.updatePost(data, postId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('게시글이 수정되었습니다.');
      navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error('수정 실패:', error.response?.data);
        alert(error.response?.data.message || '게시글 수정 실패');
      } else {
        console.error('예상치 못한 에러:', error);
        alert('게시글 수정 중 오류가 발생했습니다.');
      }
    },
  });

  // 게시글 삭제
  const deletePostMutation = useMutation({
    mutationFn: () => postApi.deletePost(postId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('게시글이 삭제되었습니다.');
      navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error('삭제 실패:', error.response?.data);
        alert(error.response?.data.message || '게시글 삭제 실패');
      } else {
        console.error('예상치 못한 에러:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    },
  });

  const handlePostSubmit = (data: CreatePostDto) => {
    const newData = { ...data, watch: watch.toString() };
    updatePostMutation.mutate(newData);
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deletePostMutation.mutate();
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg">게시글 불러오는 중...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow-md max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">게시글 수정</h1>

        <form onSubmit={handleSubmit(handlePostSubmit)} className="space-y-6">
          {/* 제목 입력 */}
          <div>
            <label htmlFor="title" className="block text-xl font-medium mb-2">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요(5자 이상 30자 이내)"
              maxLength={30}
              {...register('title')}
              error={errors.title?.message}
              required
            />
          </div>

          {/* 내용 입력 */}
          <div>
            <label htmlFor="post" className="block text-xl font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              placeholder="내용을 입력해주세요(10자 이상 300자 이내)"
              {...register('post')}
              className="w-full h-80 border rounded p-2 resize-none"
              maxLength={300}
            />
            {errors.post && (
              <p className="text-red-500 text-sm mt-1">{errors.post.message}</p>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-4">
            <OutlinedButton type="button" onClick={handleDelete}>
              삭제
            </OutlinedButton>
            <OutlinedButton type="button" onClick={handleCancel}>
              작성 취소
            </OutlinedButton>
            <Button
              type="submit"
              disabled={!isValid || updatePostMutation.isPending}
            >
              {updatePostMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  수정 중...
                </div>
              ) : (
                '수정하기'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default PostEditPage;
