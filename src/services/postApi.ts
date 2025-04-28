import { getPostsParams, searchPostsParams } from '../types/dtos/profile.dto';
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
  order,
  take,
}: searchPostsParams) => {
  const url = `/post-article/search/${keyword}/${skip}/${take}/${order}`;
  const response = await client.get(url);
  return response.data;
};

const postApi = {
  getPostList,
  searchPostList,
};

export default postApi;
