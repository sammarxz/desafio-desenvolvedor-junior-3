import { loginUserHandler, registerUserHandler } from './user.controller';

import {
  createUserSchema,
  createUserResponseSchema,
  loginUserSchema,
  loginUserResponseSchema,
} from './user.schema';

import { RouteConfig } from '../../utils/registerRoutes';

export const userRoutes = (): RouteConfig[] => [
  {
    method: 'POST',
    url: `/register`,
    schema: {
      tags: ['User'],
      description: 'Register a new user',
      body: createUserSchema,
      response: {
        200: createUserResponseSchema,
      },
    },
    handler: registerUserHandler,
  },
  {
    method: 'POST',
    url: `/login`,
    schema: {
      tags: ['User'],
      description: 'Login user',
      body: loginUserSchema,
      response: {
        200: loginUserResponseSchema,
      },
    },
    handler: loginUserHandler,
  },
];
