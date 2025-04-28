import { useParams } from 'react-router-dom';

function PostEditPage() {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">게시글 수정</h1>
      <p>수정할 게시글 ID: {postId}</p>
    </div>
  );
}

export default PostEditPage;
