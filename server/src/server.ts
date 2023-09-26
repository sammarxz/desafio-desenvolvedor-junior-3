import Fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { userRoutes } from './modules/user/user.routes';

const swaggerOptions = {
  openapi: {
    info: {
      title: 'Fastify API',
      description: 'API for Softmakers developer test',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
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

    this.configureCompiler();
    this.configurePlugins();
    this.configureRoutes();
  }

  private configureCompiler() {
    this.server.setValidatorCompiler(validatorCompiler);
    this.server.setSerializerCompiler(serializerCompiler);
  }

  private async configurePlugins() {
    this.server.register(fastifySwagger, swaggerOptions);
    this.server.register(fastifySwaggerUi, swaggerUiOptions);
  }

  private async configureRoutes() {
    this.server.get('/healthcheck', async function () {
      return { status: 'OK' };
    });

    this.server.register(userRoutes, {
      prefix: 'api/users',
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
