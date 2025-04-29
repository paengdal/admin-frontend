// services/postCommentApi.ts
import client from './client';

const createComment = async ({
  postId,
  comment,
}: {
  postId: number;
  comment: string;
}) => {
  const url = '/comment/create/one';
  const response = await client.post(url, { postId, comment });
  return response.data;
};

const getComments = async ({
  postId,
  skip = 0,
  take = 10,
  order = 'DESC',
}: {
  postId: number;
  skip?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
}) => {
  const url = `/comment/find/many/${skip}/${take}/${order}/${postId}`;
  const response = await client.get(url);
  const [list, totalCount] = response.data.result;
  return { list, totalCount };
};

const updateComment = async ({
  commentId,
  comment,
  delete_comment = false,
}: {
  commentId: number;
  comment: string;
  delete_comment?: boolean;
}) => {
  const url = `/comment/update/one/${commentId}`;
  const response = await client.patch(url, {
    comment,
    delete_comment,
  });
  return response.data;
};

const deleteComment = async (commentId: number) => {
  const url = '/comment';
  const response = await client.delete(url, {
    params: { commentId },
  });
  return response.data;
};

const postCommentApi = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};

export default postCommentApi;
