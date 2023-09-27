import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { loginUserHandler, registerUserHandler } from './user.controller';
import {
  createUserSchema,
  createUserResponseSchema,
  loginUserSchema,
  loginUserResponseSchema,
} from './user.schema';

export async function userRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/register',
    schema: {
      tags: ['User'],
      description: 'Register a new user',
      body: createUserSchema,
      response: {
        200: createUserResponseSchema,
      },
    },
    handler: registerUserHandler,
  });

  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/login',
    schema: {
      tags: ['User'],
      description: 'Login user',
      body: loginUserSchema,
      response: {
        200: loginUserResponseSchema,
      },
    },
    handler: loginUserHandler,
  });
}
