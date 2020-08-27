import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

const defaultClient = new ApolloClient({
    uri: "https://spacexdata.herokuapp.com/graphql",
    // cache: new InMemoryCache(),
});

type PropType = {
    children: any,
    _client?: any,
}

const ApolloClientProvider: React.FC<PropType> = ({ children, _client }) => {

    const clientParam = _client? _client: defaultClient;

    return (
        <ApolloProvider client={clientParam}>
            <ApolloHooksProvider client={clientParam}>
                {children}
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

export default ApolloClientProvider;