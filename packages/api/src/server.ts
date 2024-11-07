import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { authChecker } from './auth/authChecker'
import { authTokenMiddleware } from './auth/authTokenMiddleware'
import {
  COOKIE_SECRET,
  CORS_ORIGIN,
  DB_POSTGRES_LOGGING,
  DB_POSTGRES_SYNCHRONIZE,
  JWT_ACCESS_SECRET,
  NODE_ENV,
  PORT
} from './config'
import { UserResolver } from './graphql/resolvers/UserResolver'

const main = async () => {
  console.log('Starting server up...')

  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: DB_POSTGRES_SYNCHRONIZE,
    logging: DB_POSTGRES_LOGGING,
    entities: ['build/entity/**/*.js'],
    migrations: ['build/migration/**/*.js'],
    subscribers: ['build/subscriber/**/*.js']
  })
  console.log('Connected to DB...')

  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker
  })
  console.log('Graphql Schema build complete...')

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    introspection: true // Keep introspection on for development environments
  })

  const app = express()

  app.use(
    cors({
      origin: ['https://studio.apollographql.com', CORS_ORIGIN],
      credentials: true // Allow cookies and credentials to be sent
    })
  )

  app.use(cookieParser(COOKIE_SECRET))
  app.use(authTokenMiddleware(JWT_ACCESS_SECRET))

  await apolloServer.start() // Start the server before applying middleware

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(PORT, () =>
    console.log(
      `${
        NODE_ENV.charAt(0).toUpperCase() + NODE_ENV.slice(1)
      } Server Started on Port ${PORT}...`
    )
  )
}

main()
