import Fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import t, { test } from 'tap';
import { ImportMock } from 'ts-mock-imports';
import { IncomingMessage, ServerResponse } from 'http';

import * as userService from '../user.service';
import { initializeServer } from '../../../initializeServer';
import { prisma } from '../../../lib/prisma';

let server: FastifyInstance<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  FastifyTypeProviderDefault
>;

t.before(() => {
  server = Fastify();
  initializeServer(server);
});

test('POST `/api/users` should create user with mock createUser', async (t) => {
  const id = randomUUID();
  const email = faker.internet.email();
  const password = faker.internet.password();

  const stub = ImportMock.mockFunction(userService, 'createUser', {
    id,
    email,
    password,
  });

  t.teardown(() => {
    // server.close();
    stub.restore();
  });

  const response = await server.inject({
    method: 'POST',
    url: '/api/users',
    payload: {
      id,
      email,
      password,
    },
  });

  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  const json = response.json();

  t.equal(json.id, id);
  t.equal(json.email, email);
});

test('POST `/api/users` should create user with test database', async (t) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  t.teardown(async () => {
    // server.close();
    await prisma.user.deleteMany({});
  });

  const response = await server.inject({
    method: 'POST',
    url: '/api/users',
    payload: {
      email,
      password,
    },
  });

  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  const json = response.json();

  t.equal(json.email, email);
  t.type(json.id, 'string');
});

test('POST `/api/users` should fail to create user with a incorrect request', async (t) => {
  const password = faker.internet.password();

  t.teardown(async () => {
    server.close();
    await prisma.user.deleteMany({});
  });

  const response = await server.inject({
    method: 'POST',
    url: '/api/users',
    payload: {
      password,
    },
  });

  t.equal(response.statusCode, 400);

  const json = response.json();

  t.equal(response.statusCode, 400);
  t.equal(json.error, 'Bad Request');
});
