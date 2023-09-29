import { handleCommonRequest } from '../api.request';

import { type UserResponse } from '../user/user.types';

import { type PostsResponse } from './post.types';

export async function getPosts(): Promise<PostsResponse> {
  return handleCommonRequest<PostsResponse>('/posts', 'GET');
}

export async function createPost(
  token: string,
  content: string
): Promise<UserResponse> {
  return handleCommonRequest<UserResponse>('/posts', 'POST', token, content);
}

export async function deletePost(
  token: string,
  postId: string
): Promise<UserResponse> {
  return handleCommonRequest<UserResponse>(`/posts/${postId}`, 'DELETE', token);
}

export async function updatePost(
  token: string,
  postId: string,
  content: string
): Promise<UserResponse> {
  return handleCommonRequest<UserResponse>(
    `/posts/${postId}`,
    'PUT',
    token,
    content
  );
}
