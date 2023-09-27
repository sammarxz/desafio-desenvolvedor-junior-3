import { FastifyReply, FastifyRequest } from 'fastify';

import { createPost, deletePost, getPosts } from './post.service';

import { CreatePostInput, DeletePostInput } from './post.schema';

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

export async function deletePostHandler(
  req: FastifyRequest<{
    Params: DeletePostInput;
  }>,
  reply: FastifyReply
) {
  const post = await deletePost(req.user.id, req.params.postId);

  if (!post) {
    return reply.code(404).send({
      message: 'Post not found',
    });
  }

  reply.code(204).send({
    status: 'success',
    data: null,
  });
}
