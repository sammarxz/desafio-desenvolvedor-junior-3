import { FastifyRequest } from 'fastify';

import { createPost } from './post.service';
import { CreatePostInput } from './post.schema';

export async function createPostHandler(
  request: FastifyRequest<{
    Body: CreatePostInput;
  }>
) {
  const post = await createPost({
    ...request.body,
  });

  return post;
}
