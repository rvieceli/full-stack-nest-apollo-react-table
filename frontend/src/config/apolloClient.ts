import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = `${process.env.REACT_APP_API_URL}/graphql`;

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
