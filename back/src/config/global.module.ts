import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from '.'
import { validate } from './env-schema'
import { PrismaModule } from 'src/prisma/prisma.module'
import * as path from 'path'

const rootDir = path.join(__dirname, '..', '..')
console.log('test:' + rootDir)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${rootDir}/config/env/.env.${process.env.NODE_ENV}.local`],
      isGlobal: true,
      load: configuration,
      validate,
      expandVariables: true
    }),
    PrismaModule.forRoot()
  ]
})
export class GlobalModule {}
