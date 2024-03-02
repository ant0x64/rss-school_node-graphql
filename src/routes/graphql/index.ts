import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphqlSchema } from './schemas.js';
import { graphql } from 'graphql';

import { Context } from './types/context.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
    
      return await graphql({
        schema: graphqlSchema,
        source: query,
        contextValue: {
          db: prisma
        } as Context,
        variableValues: variables,
      });
    },
  });
};

export default plugin;
