import Fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const swaggerOptions = {
  openapi: {
    info: {
      title: 'Fastify API',
      description: 'API for Softmakers developer test',
      version: '1.0.0',
    },
  },
};

const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
  staticCSP: true,
};

export class Server {
  private server: FastifyInstance;

  constructor() {
    this.server = Fastify();

    this.configurePlugins();
    this.configureRoutes();
  }

  private async configurePlugins() {
    this.server.register(fastifySwagger, swaggerOptions);
    this.server.register(fastifySwaggerUi, swaggerUiOptions);
  }

  private async configureRoutes() {
    this.server.get('/healthcheck', async function () {
      return { status: 'OK' };
    });
  }

  async start({ port = 3000 }: { port?: number }) {
    try {
      await this.server.listen({ port });
      console.log(`Server ready at http://localhost:${port}`);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
