import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './components/App.tsx'

import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { AUTH_TOKEN } from './constants.tsx'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  operation.setContext({
    headers: {
      ...operation.getContext().headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
