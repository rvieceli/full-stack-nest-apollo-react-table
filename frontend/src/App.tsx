import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { router } from './routes';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apolloClient';

export function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
