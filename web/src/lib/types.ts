export interface UserResponse {
  id: string;
  email: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface PostData {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  author: {
    email: string;
    id: string;
  };
}

export type PostsResponse = PostData[];
