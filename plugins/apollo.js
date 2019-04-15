
import {AsyncStorage} from 'react-native';

import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context'

const wsLink = new WebSocketLink({
  uri: `wss://cashsend-api.herokuapp.com/subscriptions`,
  options: {
    reconnect: true
  }
});

// Create an http link:
const httpLink = new HttpLink({
  uri: 'https://cashsend-api.herokuapp.com/'
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);



const client = new ApolloClient({ 
  link,
  cache: new InMemoryCache(),
})

export default client;
