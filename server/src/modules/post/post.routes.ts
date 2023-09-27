import { FastifyInstance } from 'fastify';

import { RouteConfig } from '../../utils/registerRoutes';

import { createPostHandler, getPostsHandler } from './post.controller';
import {
  authorizationHeaderSchema,
  createPostResponseSchema,
  createPostSchema,
  postsResponseSchema,
} from './post.schema';

export const postRoutes = (app: FastifyInstance): RouteConfig[] => [
  {
    method: 'POST',
    url: '/',
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
    url: '/',
    schema: {
      tags: ['Posts'],
      description: 'get all posts',
      response: {
        200: postsResponseSchema,
      },
    },
    handler: getPostsHandler,
  },
];
