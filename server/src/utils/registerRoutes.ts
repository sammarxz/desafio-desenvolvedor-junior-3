/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FastifyInstance,
  RouteShorthandOptions,
  FastifySchema,
  FastifyRequest,
  FastifyReply,
  DoneFuncWithErrOrRes,
} from 'fastify';
import { ZodObject } from 'zod';

type PreHandlerFunction = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes
) => void;

interface CustomRouteShorthandOptions
  extends RouteShorthandOptions,
    FastifySchema {
  params?: ZodObject<any>;
}

export type RouteConfig = {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  url: string;
  schema: CustomRouteShorthandOptions & {
    tags: string[];
    description: string;
    headers?: ZodObject<any>;
    body?: ZodObject<any>;
    response?: { [statusCode: number]: FastifySchema };
  };
  handler: (...args: any[]) => any;
  preHandler?: PreHandlerFunction | PreHandlerFunction[];
};

type RouteProps = {
  app: FastifyInstance;
  prefix?: string;
  routes: () => RouteConfig[];
};

export function registerRoutes({ app, prefix = '', routes }: RouteProps) {
  const routeConfigs = routes();

  for (const route of routeConfigs) {
    app.route({
      ...route,
      url: `${prefix}${route.url}`,
    });
  }
}
