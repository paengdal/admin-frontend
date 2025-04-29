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

export type CreatePostDto = {
  title: string;
  post: string;
};

export type UpdatePostDto = {
  title: string;
  post: string;
  watch: string;
};

export interface GetPostResponse {
  result: {
    result: {
      id: number;
      userId: number;
      nickname: string;
      title: string;
      post: string;
      watch: number;
      created_at: string;
      updated_at: string;
    };
    message: string;
  };
}
