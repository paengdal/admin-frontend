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
  return response.data.result;
};

const updateComment = async ({
  commentId,
  nickname,
  comment,
  delete_comment = false,
}: {
  commentId: number;
  nickname: string;
  comment: string;
  delete_comment?: boolean;
}) => {
  console.log(commentId, nickname, comment, delete_comment);
  const url = `/comment/update/one/${commentId}`;
  const response = await client.patch(url, {
    nickname,
    comment,
    delete_comment,
  });
  return response.data;
};

const deleteComment = async (commentId: number) => {
  console.log(commentId);
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
