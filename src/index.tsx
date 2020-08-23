import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

const client = new ApolloClient({
  uri: "https://spacexdata.herokuapp.com/graphql",
  // cache: new InMemoryCache(),
});

ReactDOM.render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
    <App />    
    </ApolloHooksProvider>
    </ApolloProvider>
  // </React.StrictMode>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
