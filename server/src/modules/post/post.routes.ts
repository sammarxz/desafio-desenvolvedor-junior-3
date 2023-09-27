import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { createPostHandler, getPostsHandler } from './post.controller';
import {
  authorizationHeaderSchema,
  createPostResponseSchema,
  createPostSchema,
  postsResponseSchema,
} from './post.schema';

export async function postRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [server.authenticate],
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
  });
  server.withTypeProvider<ZodTypeProvider>().route({
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
  });
}
