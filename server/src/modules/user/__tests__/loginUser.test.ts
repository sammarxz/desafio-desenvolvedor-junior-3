import Fastify from 'fastify';
import { faker } from '@faker-js/faker';
import t, { test } from 'tap';
import { UserType } from '@fastify/jwt';

import {
  FastifyZodInstance,
  initializeServer,
} from '../../../initializeServer';
import { prisma } from '../../../lib/prisma';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

let server: FastifyZodInstance;

test('POST `/apilogin`', async () => {
  t.before(() => {
    server = Fastify().withTypeProvider<ZodTypeProvider>();
    initializeServer(server);
  });

  test('given the correct email and password', async (t) => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    t.teardown(async () => {
      await prisma.user.deleteMany({});
    });

    await server.inject({
      method: 'POST',
      url: 'api/register',
      payload: {
        email,
        password,
      },
    });

    const response = await server.inject({
      method: 'POST',
      url: '/api/login',
      payload: {
        email,
        password,
      },
    });

    t.equal(response.statusCode, 200);

    const verified = server.jwt.verify<UserType>(response.json().accessToken);

    t.equal(verified.email, email);
    t.type(verified.id, 'string');
  });

  test('given the incorrect email and password', async (t) => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    t.teardown(async () => {
      await prisma.user.deleteMany({});
    });

    await server.inject({
      method: 'POST',
      url: '/api/register',
      payload: {
        email,
        password,
      },
    });

    const response = await server.inject({
      method: 'POST',
      url: '/api/login',
      payload: {
        email,
        password: 'wrong',
      },
    });

    t.equal(response.statusCode, 401);

    const json = response.json();

    t.equal(json.message, 'Invalid email or password');
  });
});
