import { z } from 'zod';

const postCore = {
  content: z.string({
    required_error: 'Content is required',
  }),
};

const postGenerated = {
  id: z.string().uuid(),
  created_at: z.date(),
  updated_at: z.date(),
};

export const createPostSchema = z.object({
  ...postCore,
  authorId: z.string().uuid(),
});

export const createPostResponseSchema = z.object({
  ...postCore,
  ...postGenerated,
  authorId: z.string().uuid(),
});

export const postsResponseSchema = z.array(createPostResponseSchema);

export type CreatePostInput = z.infer<typeof createPostSchema>;
