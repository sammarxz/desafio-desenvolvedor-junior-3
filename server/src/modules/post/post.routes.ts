import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { createPostHandler } from './post.controller';
import { createPostResponseSchema, createPostSchema } from './post.schema';

export async function postRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: createPostSchema,
      response: {
        201: createPostResponseSchema,
      },
    },
    handler: createPostHandler,
  });
}
