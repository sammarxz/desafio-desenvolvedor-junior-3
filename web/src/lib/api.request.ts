const SERVER_ENDPOINT =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

export async function handleCommonRequest<T>(
  endpoint: string,
  method: string,
  token?: string,
  body?: any
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body,
  };

  const response = await fetch(`${SERVER_ENDPOINT}${endpoint}`, options);
  return handleResponse<T>(response);
}

export async function handleResponse<T>(response: Response): Promise<T> {
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
