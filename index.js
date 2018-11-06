// import * as admin from 'firebase-admin';
const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const { ApolloServer, ApolloError, ValidationError, gql } = require('apollo-server');

// interface User {
//     id: string;
//     name: string;
//     screenName: string;
//     statusesCount: number;
// }
  
// interface Tweet {
//     id: string;
//     likes: number;
//     text: string;
//     userId: string;
// }

const typeDefs = gql`
# A Twitter User
type User {
    id: ID!
    name: String!
    screenName: String!
    statusesCount: Int!
    tweets: [Tweets]!
}
# A Tweet Object
type Tweets {
    id: ID!
    text: String!
    userId: String!
    user: User!
    likes: Int!
}
type Query {
    tweets: [Tweets]
    user(id: String!): User
}
`;

const resolvers = {
    Query: {
      async tweets() {
        const tweets = await admin
          .firestore()
          .collection('tweets')
          .get();
        return tweets.docs.map(tweet => tweet.data());
      },
      async user(_, args) {
        try {
          const userDoc = await admin
            .firestore()
            .doc(`users/${args.id}`)
            .get();
          const user = userDoc.data();
          return user || new ValidationError('User ID not found');
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },
    User: {
      async tweets(user) {
        try {
          const userTweets = await admin
            .firestore()
            .collection('tweets')
            .where('userId', '==', user.id)
            .get();
          return userTweets.docs.map(tweet => tweet.data());
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },
    Tweets: {
      async user(tweet) {
        try {
          const tweetAuthor = await admin
            .firestore()
            .doc(`users/${tweet.userId}`)
            .get();
          return tweetAuthor.data();
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    }
  };

// const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
// const books = [
//   {
//     title: 'Harry Potter and the Chamber of Secrets',
//     author: 'J.K. Rowling',
//   },
//   {
//     title: 'Jurassic Park',
//     author: 'Michael Crichton',
//   },
// ];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
// const typeDefs = gql`
//   # Comments in GraphQL are defined with the hash (#) symbol.

//   # This "Book" type can be used in other type declarations.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is the root of all GraphQL queries.
//   # (A "Mutation" type will be covered later on.)
//   type Query {
//     books: [Book]
//   }
// `;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
//   User: {
//     async tweets(user) {
//       try {
//         const userTweets = await admin
//           .firestore()
//           .collection('tweets')
//           .where('userId', '==', user.id)
//           .get();
//         return userTweets.docs.map(tweet => tweet.data()) as Tweet[];
//       } catch (error) {
//         throw new ApolloError(error);
//       }
//     }
//   },    
// };

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});