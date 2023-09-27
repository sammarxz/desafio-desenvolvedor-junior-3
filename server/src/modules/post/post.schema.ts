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

export const createPostSchema = z.object({
  ...postCore,
  authorId: z.string().uuid(),
});

export const createPostResponseSchema = z.object({
  ...postCore,
  ...postGenerated,
  authorId: z.string().uuid(),
});

// TODO: study how to add Authorization header in fastify-swagger
export const authorizationHeaderSchema = z.object({
  authorization: z.string({
    description: 'Access Token',
  }),
});

export const postsResponseSchema = z.array(
  z.object({
    ...postCore,
    ...postGenerated,
    author: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
    }),
  })
);

export const postIdParamSchema = z.string().uuid();

export const deletePostSchema = z.object({
  postId: postIdParamSchema,
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export type DeletePostInput = z.infer<typeof deletePostSchema>;

export type PostIdInput = z.infer<typeof postIdParamSchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas(
  {
    createPostSchema,
    createPostResponseSchema,
    postsResponseSchema,
    deletePostSchema,
  },
  {
    $id: 'postSchemas',
  }
);
