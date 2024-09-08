import { ApolloServer } from "@apollo/server";
import {User} from './user';

async function createApolloGraphqlServer() {
    //Create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query {
               ${User.queries}
               getContext: String
            }
            type Mutation {
                ${User.mutations}
            }    
        `,  //Schema

        resolvers: {
            Query: {
                ...User.resolvers.queries,
                getContext: (_: any, parametrs: any, context) => {
                    console.log('context', context);
                    return "Okay";
                }
            },
            Mutation: {
                ...User.resolvers.mutations,
            },
        } //resolvers
    });

    //Start the gql Server
    await gqlServer.start();
    return gqlServer;
}

export default createApolloGraphqlServer;