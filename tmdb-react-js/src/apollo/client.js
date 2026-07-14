// src/apollo/client.js
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import authLink from "./authLink";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listMovies: {
            keyArgs(args) {
              if (!args?.filter) {
                return ["sort"];
              }

              const { skip, limit, ...filterWithoutPagination } = args.filter;

              return [
                JSON.stringify(filterWithoutPagination),
                JSON.stringify(args.sort),
              ];
            },
            merge(existing, incoming, { args }) {
              if (!existing) {
                return incoming;
              }

              const skip = args?.filter?.skip ?? 0;
              const merged = existing.data ? existing.data.slice(0) : [];

              incoming.data.forEach((movie, index) => { merged[skip + index] = movie; });

              return { ...incoming, data: merged };
            },
          },
        },
      },
    },
  }),
});

export default client;