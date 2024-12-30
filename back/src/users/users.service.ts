import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { account } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { AuthConfig } from 'src/config'
import { exclude } from 'src/utils'
import { AccountInfo } from 'src/types'

@Injectable()
export class UsersService {
  constructor(
    protected readonly databaseService: PrismaService,
    protected configService: ConfigService
  ) {}

  async findUserWithEmail(userEmail: string): Promise<account | undefined> {
    const result = await this.databaseService.account.findUnique({
      where: {
        email: userEmail
      }
    })
    return result
  }

  async findUserWithId(userId: number): Promise<AccountInfo | undefined> {
    const result = await this.databaseService.account.findUnique({
      where: {
        id: userId
      }
    })
    const account = exclude(result, ['password'])
    return account
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentRefreshToken =
      await this.getCurrentHashedRefreshToken(refreshToken)
    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp()
    await this.databaseService.account.update({
      where: {
        id: userId
      },
      data: {
        token: currentRefreshToken,
        tokenExp: currentRefreshTokenExp
      }
    })
  }

  async getCurrentHashedRefreshToken(refreshToken: string): Promise<string> {
    const saltOrRounds = 12
    const currentRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds)
    return currentRefreshToken
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date()
    const currentRefreshTokenExp = new Date(
      currentDate.getTime() +
        parseInt(
          this.configService.getOrThrow<AuthConfig>('auth').refresh.expireIn
        )
    )
    return currentRefreshTokenExp
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number
  ): Promise<AccountInfo> {
    const user = await this.databaseService.account.findFirst({
      where: {
        id: userId
      }
    })

    if (!user.token) {
      return null
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.token
    )

    if (isRefreshTokenMatching) {
      const account = exclude(user, ['password'])
      return account
    }
  }

  async removeRefreshToken(userId: number): Promise<any> {
    const result = await this.databaseService.account.update({
      where: {
        id: userId
      },
      data: {
        token: null,
        tokenExp: null
      }
    })
    return result
  }
}
