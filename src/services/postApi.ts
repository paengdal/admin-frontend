import {
  CreatePostDto,
  getPostsParams,
  UpdatePostDto,
} from '../types/dtos/post.dto';
import client from './client';

// 게시글 리스트 불러오기
const getPostList = async ({ skip, order, take }: getPostsParams) => {
  const url = `/post-article/find/many/${skip}/${take}/${order}`;
  const response = await client.get(url);

  const [list, totalCount] = response.data.result;
  return { list, totalCount };
};

// 게시글 검색하기
export const searchPostList = async ({
  keyword,
  skip = 0,
  take = 10,
  order = 'DESC',
}: {
  keyword: string;
  skip?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
}) => {
  const response = await client.get(
    `/post-article/search/${encodeURIComponent(
      keyword
    )}/${skip}/${take}/${order}`
  );
  const [list, totalCount] = response.data.result;
  return { list, totalCount };
};

// 게시글 작성하기
const createPost = async (data: CreatePostDto) => {
  const url = '/post-article';
  const response = await client.post(url, data);
  return response.data;
};

// 하나의 게시글 불러오기
const getPost = async (postId: string) => {
  const url = `/post-article/find/one/${postId}`;
  const response = await client.get(url);
  return response.data;
};

// 게시글 삭제하기
const deletePost = async (postId: string) => {
  const url = `/post-article/delete/one/${postId}`;
  const response = await client.delete(url);
  return response.data;
};

// 게시글 수정하기
const updatePost = async (data: UpdatePostDto, postId: string) => {
  const url = `/post-article/update/one/${postId}`;
  const response = await client.patch(url, data);
  return response.data;
};

const postApi = {
  getPostList,
  searchPostList,
  createPost,
  getPost,
  deletePost,
  updatePost,
};

export default postApi;
