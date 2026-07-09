import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloProvider } from '@apollo/client/react'
import './styles/index.css'
import App from './components/App.tsx'
import { AUTH_TOKEN } from './constants.tsx'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  operation.setContext({
    headers: {
      ...operation.getContext().headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  })
)

const splitLink = ApolloLink.split(
  (operation) => {
    const definition = getMainDefinition(operation.query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)