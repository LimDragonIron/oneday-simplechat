import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { DatabaseConfig } from 'src/config'
import { format } from 'sql-formatter'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name)
  constructor(protected readonly configService: ConfigService) {
    super()
    const datasourceUrl =
      configService.getOrThrow<DatabaseConfig>('database').url
    this.logger.debug(`database url: ${datasourceUrl}`)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', ({ query, params }) => {
      this.logger.debug(`${format(query)}\tparams: ${params}`)
    })
  }

  async onModuleInit() {
    await this.$connect()
  }
}
