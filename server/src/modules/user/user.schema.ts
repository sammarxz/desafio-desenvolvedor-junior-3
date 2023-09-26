import { z } from 'zod';
// import { jsonSchemaTransform } from 'fastify-type-provider-zod';

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
  id: z.string().uuid(),
  ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
