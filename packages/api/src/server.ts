import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {
  COOKIE_SECRET,
  CORS_ORIGIN,
  JWT_ACCESS_SECRET,
  NODE_ENV,
  PORT,
  DB_POSTGRES_HOST,
  DB_POSTGRES_PORT,
  DB_POSTGRES_USERNAME,
  DB_POSTGRES_PASSWORD,
  DB_POSTGRES_DATABASE,
  DB_POSTGRES_SYNCHRONIZE,
  DB_POSTGRES_LOGGING
} from './config'
import { UserResolver } from './graphql/resolvers/UserResolver'
import { authChecker } from './auth/authChecker'
import { authTokenMiddleware } from './auth/authTokenMiddleware'

const main = async () => {
  console.log('Starting server up...')

  await createConnection({
    type: 'postgres',
    host: DB_POSTGRES_HOST,
    port: DB_POSTGRES_PORT,
    username: DB_POSTGRES_USERNAME,
    password: DB_POSTGRES_PASSWORD,
    database: DB_POSTGRES_DATABASE,
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
    context: ({ req, res }) => ({ req, res })
  })

  const app = express()

  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true
    })
  )
  app.use(cookieParser(COOKIE_SECRET))
  app.use(authTokenMiddleware(JWT_ACCESS_SECRET))

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
