// components/comments/CommentList.tsx
import dayjs from 'dayjs';
import { useAuth } from '../../contexts/authContext';
import { CommentItem } from '../../types/dtos/comment.dto';
import Button from '../atoms/Button';
import OutlinedButton from '../atoms/OutlinedButton';

interface Props {
  comments: CommentItem[];
  editId: number | null;
  editValue: string;
  onStartEdit: (comment: CommentItem) => void;
  onChangeEdit: (value: string) => void;
  onCancelEdit: () => void;
  onSubmitEdit: (comment: CommentItem) => void;
  onDelete: (commitId: number) => void;
}

export default function CommentList({
  comments,
  editId,
  editValue,
  onStartEdit,
  onChangeEdit,
  onCancelEdit,
  onSubmitEdit,
  onDelete,
}: Props) {
  const { user } = useAuth();

  return (
    <ul className="space-y-4">
      {comments
        .filter((c) => !c.delete_comment)
        .map((comment) => (
          <li key={comment.commitId + comment.comment} className="rounded p-2">
            {editId === comment.commitId ? (
              <>
                <textarea
                  value={editValue}
                  onChange={(e) => onChangeEdit(e.target.value)}
                  className="w-full border rounded p-2 mb-2 h-[90px]"
                />
                <div className="flex gap-2 justify-end">
                  <OutlinedButton onClick={onCancelEdit}>취소</OutlinedButton>
                  <Button onClick={() => onSubmitEdit(comment)}>수정</Button>
                </div>
              </>
            ) : (
              <>
                <div className="whitespace-pre-wrap mb-1">
                  {comment.comment}
                </div>
                <div className="text-sm text-gray-500 flex justify-between">
                  <div className="mt-3">
                    <span className="mr-2 font-bold">
                      {comment.user.nickname}
                    </span>
                    <span>
                      {dayjs(comment.created_at).format('YYYY.MM.DD HH:mm')}
                    </span>
                  </div>
                  {user?.id === comment.userId && (
                    <div className="space-x-2">
                      <button
                        onClick={() => onStartEdit(comment)}
                        className="text-blue-500 underline text-xs"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => onDelete(comment.commitId)}
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
  );
}
