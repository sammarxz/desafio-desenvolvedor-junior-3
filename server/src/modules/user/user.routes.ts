import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { registerUserHandler } from './user.controller';
import { createUserSchema, createUserResponseSchema } from './user.schema';

export async function userRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: createUserSchema,
      response: {
        200: createUserResponseSchema,
      },
    },
    handler: registerUserHandler,
  });
}
