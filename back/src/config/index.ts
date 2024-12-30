import type { ConfigType } from '@nestjs/config'
import { registerAs } from '@nestjs/config'

export const authConfig = registerAs('auth', () => ({
  access: {
    secret: process.env.JWT_ACCESS_SECRET ?? '',
    expireIn: process.env.JWT_ACCESS_EXPIRE_IN ?? '30m'
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET ?? '',
    expireIn: process.env.JWT_REFRESH_EXPIRE_IN ?? '30d'
  }
}))

export type AuthConfig = ConfigType<typeof authConfig>

const generateDatabaseUrl = (
  host = 'localhost',
  port = 3306,
  user = 'root',
  password = '1234',
  schema = 'sample'
) => {
  return `mysql://${user}:${password}@${host}:${port}/${schema}`
}

export type DatabaseConfig = ConfigType<typeof databaseConfig>

export const databaseConfig = registerAs('database', () => ({
  url: generateDatabaseUrl(
    process.env.DATABASE_HOST,
    +process.env.DATABASE_PORT,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_SCHEMA
  )
}))

export const configuration = [authConfig, databaseConfig]
