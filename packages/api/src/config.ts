import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') config()

const NODE_ENV: string = process.env.NODE_ENV || 'development'

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000

const DB_POSTGRES_HOST: string = process.env.DB_POSTGRES_HOST || 'localhost'

const DB_POSTGRES_PORT: number = process.env.DB_POSTGRES_PORT
  ? parseInt(process.env.DB_POSTGRES_PORT)
  : 5432

const DB_POSTGRES_USERNAME: string =
  process.env.DB_POSTGRES_USERNAME || 'postgres'

const DB_POSTGRES_PASSWORD: string =
  process.env.DB_POSTGRES_PASSWORD || 'postgres'

const DB_POSTGRES_DATABASE: string =
  process.env.DB_POSTGRES_DATABASE || 'typescript-graphql-api'

const DB_POSTGRES_SYNCHRONIZE: boolean =
  process.env.DB_POSTGRES_SYNCHRONIZE === 'true'

const DB_POSTGRES_LOGGING: boolean = process.env.DB_POSTGRES_LOGGING === 'true'

const JWT_ACCESS_SECRET: string =
  process.env.JWT_ACCESS_SECRET || 'access_secret'

const ACCESS_TOKEN_EXPIRE_TIME: number = process.env.ACCESS_TOKEN_EXPIRE_TIME
  ? parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME)
  : 3600 // in seconds

const COOKIE_SECRET: string = process.env.COOKIE_SECRET || 'cookie_secret'

const SECURE_COOKIE: boolean = process.env.SECURE_COOKIE === 'true'

const CORS_ORIGIN: string = process.env.CORS_ORIGIN || '*'

const GOOGLE_OAUTH2_CLIENT_ID: string =
  process.env.GOOGLE_OAUTH2_CLIENT_ID || 'google_client_id'

const GOOGLE_OAUTH2_CLIENT_SECRET: string =
  process.env.GOOGLE_OAUTH2_CLIENT_SECRET || 'google_client_secret'

export {
  NODE_ENV,
  PORT,
  DB_POSTGRES_HOST,
  DB_POSTGRES_PORT,
  DB_POSTGRES_USERNAME,
  DB_POSTGRES_PASSWORD,
  DB_POSTGRES_DATABASE,
  DB_POSTGRES_SYNCHRONIZE,
  DB_POSTGRES_LOGGING,
  JWT_ACCESS_SECRET,
  ACCESS_TOKEN_EXPIRE_TIME,
  COOKIE_SECRET,
  SECURE_COOKIE,
  CORS_ORIGIN,
  GOOGLE_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_CLIENT_SECRET
}
