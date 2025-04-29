import {
  CreatePostDto,
  getPostsParams,
  searchPostsParams,
} from '../types/dtos/profile.dto';
import client from './client';

// 게시글 리스트 불러오기
const getPostList = async ({ skip, order, take }: getPostsParams) => {
  const url = `/post-article/find/many/${skip}/${take}/${order}`;
  const response = await client.get(url);
  return response.data;
};

// 게시글 검색하기
const searchPostList = async ({
  keyword,
  skip,
  take,
  order,
}: searchPostsParams) => {
  const url = `/post-article/search/${keyword}`;
  const response = await client.get(url, {
    params: { skip, take, order },
  });
  return response.data;
};

// 게시글 작성하기
const createPost = async (data: CreatePostDto) => {
  const url = '/post-article';
  const response = await client.post(url, data);
  return response.data;
};

const postApi = {
  getPostList,
  searchPostList,
  createPost,
};

export default postApi;
