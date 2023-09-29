import { type UserResponse, type UserCredentials } from './types';

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
