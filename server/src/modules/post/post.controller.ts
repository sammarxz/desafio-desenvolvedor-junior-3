import { FastifyRequest } from 'fastify';

import { createPost, getPosts } from './post.service';
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

export async function getPostsHandler() {
  const posts = await getPosts();

  return posts;
}
