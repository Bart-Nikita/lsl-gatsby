import "./src/styles/global.css"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import React from 'react'

export const link = createHttpLink({
    fetch,
    uri: process.env.GATSBY_GRAPHQL_ENDPOINT || "https://lsl-test.bart-group.com/back/graphql"
  })


export const client = new ApolloClient({
    cache: new InMemoryCache(), link
})

export const  wrapPageElement = ({ element, props }) => {
   console.log(props)
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return element
}