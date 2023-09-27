import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const postCore = {
  content: z.string({
    required_error: 'Content is required',
  }),
};

const postGenerated = {
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
};

const authorSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});

export const authorizationHeaderSchema = z.object({
  authorization: z.string({
    description: 'Access Token',
  }),
});

const commonPostSchema = {
  ...postCore,
  ...postGenerated,
};

export const createPostSchema = z.object({
  ...postCore,
});

export const createPostResponseSchema = z.object({
  ...commonPostSchema,
  authorId: z.string().uuid(),
});

export const postsResponseSchema = z.array(
  z.object({
    ...commonPostSchema,
    author: authorSchema,
  })
);

export const postIdParamSchema = z.object({
  postId: z.string().uuid(),
});

export const updatePostSchema = z.object({
  ...postCore,
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type PostIdInput = z.infer<typeof postIdParamSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas(
  {
    createPostSchema,
    createPostResponseSchema,
    postsResponseSchema,
    postIdParamSchema,
    updatePostSchema,
  },
  {
    $id: 'postSchemas',
  }
);
