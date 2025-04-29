// hooks/useCommentMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import postCommentApi from '../services/commentApi';

export function useCommentMutations(postId: string) {
  const queryClient = useQueryClient();

  // 댓글 생성
  const create = useMutation({
    mutationFn: postCommentApi.createComment,
    onSuccess: () => {
      toast.success('댓글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  // 댓글 수정
  const update = useMutation({
    mutationFn: postCommentApi.updateComment,
    onSuccess: () => {
      toast.success('댓글이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  // 댓글 삭제
  const remove = useMutation({
    mutationFn: postCommentApi.deleteComment,
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return { create, update, remove };
}
