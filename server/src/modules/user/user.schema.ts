import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const userIdSchema = z.string().uuid();

const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
};

export const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
});

export const createUserResponseSchema = z.object({
  id: userIdSchema,
  ...userCore,
});

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
});

export const loginUserResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginUserInput = z.infer<typeof loginUserSchema>;

export type UserIdInput = z.infer<typeof userIdSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginUserSchema,
    loginUserResponseSchema,
  },
  {
    $id: 'userSchemas',
  }
);
