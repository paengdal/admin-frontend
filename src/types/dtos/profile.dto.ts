export type getPostsParams = {
  skip: number;
  take: number;
  order: 'ASC' | 'DESC';
};

export type searchPostsParams = {
  keyword: string;
  skip: number;
  take: number;
  order: 'ASC' | 'DESC';
};

export type PostListResponse = {
  result: {
    id: number;
    title: string;
    nickname: string;
    watch: number;
    created_at: string;
  }[];
  message: string;
};
