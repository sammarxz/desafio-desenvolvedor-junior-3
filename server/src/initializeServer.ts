import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import fjwt, { JWT } from '@fastify/jwt';
import { fastifyEnv } from '@fastify/env';
import cors from '@fastify/cors';

import { version } from '../package.json';

import { userRoutes } from './modules/user/user.routes';
import { postRoutes } from './modules/post/post.routes';

import { postSchemas } from './modules/post/post.schema';
import { userSchemas } from './modules/user/user.schema';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { registerRoutes } from './utils/registerRoutes';

export type FastifyZodInstance = FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

const fastifyEnvSchema = {
  type: 'object',
  required: ['JWT_SECRET', 'DATABASE_URL'],
  properties: {
    JWT_SECRET: {
      type: 'string',
    },
    DATABASE_URL: {
      type: 'string',
    },
  },
};

const fastifyEnvOptions = {
  schema: fastifyEnvSchema,
  dotenv: true,
};

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
  interface FastifyInstance {
    config: {
      JWT_SECRET: string;
      DATABASE_URL: string;
    };
  }
  export interface FastifyInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate: any;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

const swaggerOptions = {
  openapi: {
    info: {
      title: 'Fastify API',
      description: 'API for Softmakers developer test',
      version,
    },
  },
  transform: jsonSchemaTransform,
};

const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
  staticCSP: true,
};

export async function initializeServer(server: FastifyZodInstance) {
  // set validators
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // fastify plugins
  server.register(fastifyEnv, fastifyEnvOptions);
  await server.after(); // wait for fastify-env load .env

  server.register(fjwt, {
    secret: server.config.JWT_SECRET,
  });

  server.register(fastifySwagger, swaggerOptions);
  server.register(fastifySwaggerUi, swaggerUiOptions);
  server.register(cors, {
    origin: ['http://localhost:3000'],
  });

  // create decorator
  server.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        // await server.jwt.verify(req.headers.token as string);
        await req.jwtVerify();
      } catch (err) {
        return reply.send(err);
      }
    }
  );

  // hooks
  server.addHook('preHandler', (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  // schemas
  for (const schema of [...userSchemas, ...postSchemas]) {
    server.addSchema(schema);
  }

  // routes
  server.get('/healthcheck', async function () {
    return { status: 'OK' };
  });
  server.register(
    (app, _, done) => {
      registerRoutes({ app, routes: () => userRoutes() });
      registerRoutes({ app, prefix: '/posts', routes: () => postRoutes(app) });

      done();
    },
    { prefix: '/api' }
  );
}
