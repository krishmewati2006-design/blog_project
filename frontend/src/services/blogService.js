import api from '../api/axios';

const blogService = {
  // Post operations
  getPosts: (page = 1) => api.get(`posts/?page=${page}`),
  getPostDetail: (slug) => api.get(`posts/${slug}/`),
  createPost: (data) => api.post('posts/create/', data),
  updatePost: (slug, data) => api.patch(`posts/${slug}/`, data),
  deletePost: (slug) => api.delete(`posts/${slug}/`),

  // Comment operations
  getComments: (postId) => api.get(`posts/${postId}/comments/`),
  createComment: (postId, text) => api.post(`posts/${postId}/comments/`, { text }),
};

export default blogService;
