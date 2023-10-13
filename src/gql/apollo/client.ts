import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from 'isomorphic-fetch';


export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'https://lsl-test.bart-group.com/graphql',
        fetch
    })
});