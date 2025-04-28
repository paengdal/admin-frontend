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
