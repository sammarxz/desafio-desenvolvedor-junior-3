import { FastifyInstance } from 'fastify';

import {
  createPostHandler,
  deletePostHandler,
  getPostsHandler,
  updatePostHandler,
} from './post.controller';

import {
  authorizationHeaderSchema,
  createPostResponseSchema,
  createPostSchema,
  postIdParamSchema,
  postsResponseSchema,
  updatePostSchema,
} from './post.schema';

import { RouteConfig } from '../../utils/registerRoutes';

export const postRoutes = (app: FastifyInstance): RouteConfig[] => [
  {
    method: 'POST',
    url: '',
    preHandler: [app.authenticate],
    schema: {
      tags: ['Posts'],
      description: 'Create new post',
      headers: authorizationHeaderSchema,
      body: createPostSchema,
      response: {
        201: createPostResponseSchema,
      },
    },
    handler: createPostHandler,
  },
  {
    method: 'GET',
    url: '',
    schema: {
      tags: ['Posts'],
      description: 'get all posts',
      response: {
        200: postsResponseSchema,
      },
    },
    handler: getPostsHandler,
  },
  {
    method: 'DELETE',
    url: '/:postId',
    preHandler: [app.authenticate],
    schema: {
      tags: ['Posts'],
      description: 'delete post by id',
      headers: authorizationHeaderSchema,
      params: postIdParamSchema,
      response: {
        200: createPostResponseSchema,
      },
    },
    handler: deletePostHandler,
  },
  {
    method: 'PUT',
    url: '/:postId',
    preHandler: [app.authenticate],
    schema: {
      tags: ['Posts'],
      description: 'delete post by id',
      headers: authorizationHeaderSchema,
      params: postIdParamSchema,
      body: updatePostSchema,
    },
    handler: updatePostHandler,
  },
];
