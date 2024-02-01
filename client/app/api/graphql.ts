import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '@/graphql/schemas';
import resolvers from '@/graphql/resolvers';
import allowCors from '@/utils/api';

const isProduction = process.env.NODE_ENV === 'production';

export const config = {
  api: {
    bodyParser: !isProduction,
  },
};

const plugins = [];

if (isProduction) {
  plugins.push(ApolloServerPluginLandingPageDisabled());
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins,
  csrfPrevention: true,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res }),
});
export default allowCors(handler);
