import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Layout from '../../components/atoms/Layout';
import OutlinedButton from '../../components/atoms/OutlinedButton';
import { ROUTES } from '../../constants/routes';
import { postSchema } from '../../schemas/schemas';
import postApi from '../../services/postApi';
import { CreatePostDto } from '../../types/dtos/post.dto';

function PostCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePostDto>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
  });

  const createPostMutation = useMutation({
    mutationFn: (data: CreatePostDto) => postApi.createPost(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['posts'] });
      alert('게시글이 작성되었습니다.');
      navigate(ROUTES.POSTS.LIST);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error('서버 응답:', error.response?.data);
        alert(error.response?.data.message || '게시글 작성 실패');
      } else {
        console.error('예상치 못한 에러:', error);
        alert('게시글 작성 중 오류가 발생했습니다.');
      }
    },
  });

  const handlePostSubmit = (data: CreatePostDto) => {
    createPostMutation.mutate(data);
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow-md max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">게시글 작성</h1>

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
            <OutlinedButton type="button" onClick={handleCancel}>
              작성 취소
            </OutlinedButton>
            <Button
              type="submit"
              disabled={!isValid || createPostMutation.isPending}
            >
              {createPostMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  작성 중...
                </div>
              ) : (
                '글 작성'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default PostCreatePage;
