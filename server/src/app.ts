import Fastify from 'fastify';

import { initializeServer } from './initializeServer';

const PORT = 3333;
const server = Fastify();

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
