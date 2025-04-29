import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import OutlinedButton from '../../components/atoms/OutlinedButton';
import { useAuth } from '../../contexts/authContext';
import postCommentApi from '../../services/commentApi';
import postApi from '../../services/postApi';
import { CommentItem } from '../../types/dtos/comment.dto';

function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [commentValue, setCommentValue] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [order, setOrder] = useState<'DESC' | 'ASC'>('DESC');

  // 게시글 정보 조회
  const { data: post } = useQuery({
    queryKey: ['post', { postId }],
    queryFn: () => postApi.getPost(postId!),
    enabled: !!postId,
  });

  // 댓글 목록 조회
  const { data: comments } = useQuery({
    queryKey: ['comments', postId, order],
    queryFn: () =>
      postCommentApi.getComments({ postId: Number(postId), order }),
    enabled: !!postId,
  });

  // 댓글 생성
  const createMutation = useMutation({
    mutationFn: postCommentApi.createComment,
    onSuccess: () => {
      toast.success('댓글이 등록되었습니다.');
      setCommentValue('');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  // 댓글 수정
  const updateMutation = useMutation({
    mutationFn: postCommentApi.updateComment,
    onSuccess: () => {
      toast.success('댓글이 수정되었습니다.');
      setEditId(null);
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  // 댓글 삭제
  const deleteMutation = useMutation({
    mutationFn: postCommentApi.deleteComment,
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  const handleCreateComment = () => {
    if (!commentValue.trim()) return;
    createMutation.mutate({ postId: Number(postId), comment: commentValue });
  };

  const handleUpdateComment = (commentId: number) => {
    if (!editValue.trim() || !user) return;
    updateMutation.mutate({
      commentId,
      nickname: user.nickname,
      comment: editValue,
    });
  };

  const handleDeleteComment = (commitId: number) => {
    deleteMutation.mutate(commitId);
  };

  if (!user) return null;

  return (
    <div className="p-4 max-w-3xl mx-auto mt-10">
      {/* 게시글 정보 */}
      <h1 className="text-2xl font-bold mb-2">{post?.result.title}</h1>
      <p className="mb-4 whitespace-pre-wrap">{post?.result.post}</p>

      {/* 나가기 버튼 */}
      <div className="flex justify-end mb-6">
        <OutlinedButton onClick={() => navigate(-1)} className="!w-[150px]">
          나가기
        </OutlinedButton>
      </div>

      {/* 댓글 입력폼 */}
      <textarea
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        placeholder="댓글을 입력하세요"
        className="w-full border rounded p-2 mt-10 mb-2 h-[90px]"
      />
      <div className="mb-6 text-right">
        <Button
          onClick={handleCreateComment}
          className="!w-[100px] !h-[40px] !text-sm !p-2"
        >
          댓글 등록
        </Button>
      </div>

      {/* 정렬 옵션 */}
      {Array.isArray(comments) && comments.length > 0 && (
        <div className="flex justify-end mb-2 text-sm gap-2">
          <button
            className={order === 'DESC' ? 'font-bold' : 'text-gray-500'}
            onClick={() => setOrder('DESC')}
          >
            최신순
          </button>
          <span>|</span>
          <button
            className={order === 'ASC' ? 'font-bold' : 'text-gray-500'}
            onClick={() => setOrder('ASC')}
          >
            오래된순
          </button>
        </div>
      )}

      {/* 댓글 목록 */}
      {Array.isArray(comments) && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments?.map((c: CommentItem) => (
            <li key={c.commitId + c.comment} className="rounded p-2">
              {editId === c.commitId ? (
                <>
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full border rounded p-2 mb-2 h-[90px]"
                  />
                  <div className="flex gap-2 justify-end">
                    <OutlinedButton
                      onClick={() => setEditId(null)}
                      className="!w-[100px] !h-[40px] !text-sm !p-2"
                    >
                      취소
                    </OutlinedButton>
                    <Button
                      onClick={() => handleUpdateComment(c.commitId)}
                      className="!w-[100px] !h-[40px] !text-sm !p-2"
                    >
                      수정
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="whitespace-pre-wrap mb-1">{c.comment}</div>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span>
                      {dayjs(c.created_at).format('YYYY.MM.DD HH:mm')}
                    </span>
                    {user.id === c.userId && (
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            setEditId(c.commitId);
                            setEditValue(c.comment);
                          }}
                          className="text-blue-500 underline text-xs"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteComment(c.commitId)}
                          className="text-red-500 underline text-xs"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          댓글이 없습니다. 댓글을 달아주세요~
        </p>
      )}
    </div>
  );
}

export default PostDetailPage;
