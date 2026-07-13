import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import authLink from "./authLink";

const httpLink = new HttpLink({
  uri: "https://tmdb-server-dev.logicwind.co/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
