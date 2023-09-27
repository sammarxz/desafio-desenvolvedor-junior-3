import Fastify from 'fastify';
import { test } from 'tap';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { initializeServer } from '../initializeServer';

test('requests the `/healthcheck` route', async (t) => {
  const server = Fastify().withTypeProvider<ZodTypeProvider>();

  initializeServer(server);

  t.teardown(() => {
    server.close();
  });

  const response = await server.inject({
    method: 'GET',
    url: '/healthcheck',
  });

  t.equal(response.statusCode, 200);
  t.same(response.json(), {
    status: 'OK',
  });
});
