import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({

    uri: 'https://lsl-test.bart-group.com/back/graphql',
    cache: new InMemoryCache()
})