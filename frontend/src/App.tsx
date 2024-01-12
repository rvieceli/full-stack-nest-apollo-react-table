import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { router } from './routes';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apolloClient';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // 'dark' | 'light'
    useSystemColorMode: false,
  },
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
