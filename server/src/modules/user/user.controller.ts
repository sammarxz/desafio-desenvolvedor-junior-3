import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';

import { createUser, findUserByEmail } from './user.service';
import { CreateUserInput, LoginUserInput } from './user.schema';

export async function registerUserHandler(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function loginUserHandler(
  req: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return reply.code(401).send({
      message: 'Invalid email or password',
    });
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (correctPassword) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return {
      accessToken: req.jwt.sign(rest),
    };
  }

  return reply.code(401).send({
    message: 'Invalid email or password',
  });
}
