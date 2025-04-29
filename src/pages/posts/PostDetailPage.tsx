// PostDetailPage.tsx
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/atoms/Button';
import OutlinedButton from '../../components/atoms/OutlinedButton';
import CommentList from '../../components/organisms/CommentList';
import { useAuth } from '../../contexts/authContext';
import { useCommentMutations } from '../../hooks/useCommentMutations';
import postCommentApi from '../../services/commentApi';
import postApi from '../../services/postApi';

function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [commentValue, setCommentValue] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [order, setOrder] = useState<'DESC' | 'ASC'>('DESC');

  const { data: post } = useQuery({
    queryKey: ['post', { postId }],
    queryFn: () => postApi.getPost(postId!),
    enabled: !!postId,
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', postId, order],
    queryFn: () =>
      postCommentApi.getComments({ postId: Number(postId), order }),
    enabled: !!postId,
  });

  const { create, update, remove } = useCommentMutations(postId!);

  const handleCreateComment = () => {
    if (!commentValue.trim()) return;
    create.mutate(
      { postId: Number(postId), comment: commentValue },
      {
        onSuccess: () => setCommentValue(''),
      }
    );
  };

  const handleSubmitEdit = (comment: {
    commitId: number;
    delete_comment: boolean;
  }) => {
    if (!editValue.trim()) return;
    update.mutate({
      commentId: comment.commitId,
      comment: editValue,
      delete_comment: comment.delete_comment,
    });
    setEditId(null);
  };

  if (!user) return null;

  return (
    <div className="p-4 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-2">{post?.result.title}</h1>
      <p className="mb-4 whitespace-pre-wrap">{post?.result.post}</p>

      <div className="flex justify-end mb-6">
        <OutlinedButton onClick={() => navigate(-1)} className="!w-[150px]">
          나가기
        </OutlinedButton>
      </div>

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

      {Array.isArray(comments?.list) && comments.list.length > 0 && (
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

      {Array.isArray(comments?.list) && comments.list.length > 0 ? (
        <CommentList
          comments={comments.list}
          editId={editId}
          editValue={editValue}
          onStartEdit={(comment) => {
            setEditId(comment.commitId);
            setEditValue(comment.comment);
          }}
          onChangeEdit={setEditValue}
          onCancelEdit={() => setEditId(null)}
          onSubmitEdit={handleSubmitEdit}
          onDelete={(commitId) => remove.mutate(commitId)}
        />
      ) : (
        <p className="text-sm text-gray-500">
          댓글이 없습니다. 댓글을 달아주세요~
        </p>
      )}
    </div>
  );
}

export default PostDetailPage;
