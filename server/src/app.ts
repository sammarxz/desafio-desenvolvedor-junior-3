import Fastify from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { initializeServer } from './initializeServer';

const PORT = Number(process.env.PORT) || 3000;
const server = Fastify().withTypeProvider<ZodTypeProvider>();

initializeServer(server);

(async () => {
  try {
    await server.ready();
    await server.listen({ port: PORT });
    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
