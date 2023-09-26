import { FastifyReply, FastifyRequest } from 'fastify';

import { createUser } from './user.service';
import { CreateUserInput } from './user.schema';

export async function registerUserHandler(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}
