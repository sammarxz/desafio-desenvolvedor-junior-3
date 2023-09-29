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
