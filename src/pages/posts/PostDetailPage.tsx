import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">게시글 상세</h1>
      <p>게시글 ID: {postId}</p>
    </div>
  );
}

export default PostDetailPage;
