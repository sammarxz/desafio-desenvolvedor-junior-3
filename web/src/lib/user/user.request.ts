import { handleCommonRequest } from '../api.request';

import { UserResponse } from './user.types';

export async function apiRegisterUser(
  credentials: string
): Promise<UserResponse> {
  return handleCommonRequest<UserResponse>(
    '/register',
    'POST',
    undefined,
    credentials
  );
}
