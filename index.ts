import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import {
  useResponseCache,
  createInMemoryCache
} from "@graphql-yoga/plugin-response-cache";

const cache = createInMemoryCache();

const yoga = createYoga({
  graphqlEndpoint: "/",
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        slow: String
      }
    `,
    resolvers: {
      Query: {
        slow: async () => {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return "I am slow.";
        }
      }
    }
  }),
  plugins: [
    useResponseCache({
      cache, // use the cache created above for manual invalidation
      ttl: 2_000, // cache all operations for 2 seconds
      ttlPerSchemaCoordinate: {
        // cache operations selecting Query.slow for 10 seconds
        "Query.slow": 10_000
      },
      invalidateViaMutation: false, // disable cache invalidation
      // global cache
      session: () => null
      // cache based on the authentication header
      // session: request => request.headers.get('authorization')
    })
  ]
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000");
});
