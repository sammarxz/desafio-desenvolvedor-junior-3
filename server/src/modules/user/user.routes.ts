import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { registerUserHandler } from './user.controller';
import { createUserSchema } from './user.schema';

export async function userRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: createUserSchema,
      // response: {
      //   200: $ref("loginResponseSchema"),
      // },
    },
    handler: registerUserHandler,
  });
}
