import { type UserResponse, type PostsResponse } from './types';

const SERVER_ENDPOINT =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && data.errors !== null) {
      throw new Error(data.message);
    }

    throw new Error(data.message || response.statusText);
  }

  return data as T;
}

export async function apiRegisterUser(
  credentials: string
): Promise<UserResponse> {
  const response = await fetch(`${SERVER_ENDPOINT}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: credentials,
  });

  return handleResponse<UserResponse>(response).then((data) => data);
}

export async function getPosts(): Promise<PostsResponse> {
  const response = await fetch(`${SERVER_ENDPOINT}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'force-cache',
  });

  return handleResponse<PostsResponse>(response).then((data) => data);
}

export async function createPost(
  token: string,
  content: string
): Promise<UserResponse> {
  const response = await fetch(`${SERVER_ENDPOINT}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: content,
  });

  return handleResponse<UserResponse>(response).then((data) => data);
}

export async function deletePost(
  token: string,
  postId: string
): Promise<UserResponse> {
  const response = await fetch(`${SERVER_ENDPOINT}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<UserResponse>(response).then((data) => data);
}

export async function updatePost(
  token: string,
  postId: string,
  content: string
): Promise<UserResponse> {
  const response = await fetch(`${SERVER_ENDPOINT}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: content,
  });

  return handleResponse<UserResponse>(response).then((data) => data);
}
