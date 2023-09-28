import { FastifyReply, FastifyRequest } from 'fastify';

import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from './post.service';

import { CreatePostInput, PostIdInput, UpdatePostInput } from './post.schema';

export async function createPostHandler(
  req: FastifyRequest<{
    Body: CreatePostInput;
  }>
) {
  const post = await createPost(req.user.id, req.body);

  return post;
}

export async function getPostsHandler() {
  const posts = await getPosts();

  return posts;
}

export async function getPostByIdHandler(
  req: FastifyRequest<{
    Params: PostIdInput;
  }>,
  reply: FastifyReply
) {
  const post = await getPostById(req.user.id, req.params);

  if (!post) {
    return reply.code(404).send({
      message: 'Post not found',
    });
  }

  return post;
}

export async function deletePostHandler(
  req: FastifyRequest<{
    Params: PostIdInput;
  }>,
  reply: FastifyReply
) {
  const post = await deletePost(req.user.id, req.params);

  if (!post) {
    return reply.code(404).send({
      message: 'Post not found',
    });
  }

  reply.code(204).send();
}

export async function updatePostHandler(
  req: FastifyRequest<{
    Params: PostIdInput;
    Body: UpdatePostInput;
  }>
) {
  const updatedPost = await updatePost(req.user.id, req.params, req.body);

  return updatedPost;
}
