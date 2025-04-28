export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE_EDIT: '/profile/edit',
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts/new',
    DETAIL: (postId = ':postId') => `/posts/${postId}`,
    EDIT: (postId = ':postId') => `/posts/${postId}/edit`,
  },
};
