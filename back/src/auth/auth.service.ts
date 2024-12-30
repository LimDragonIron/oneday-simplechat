import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { AccountInfo } from 'src/types'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { SignInAuthDto } from './dto/signin-auth.dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Payload } from 'src/payload/payload.interface'
import { AuthConfig } from 'src/config'
import { RefreshTokenDto } from './dto/refresh.dto'
import { exclude } from 'src/utils'

@Injectable()
export class AuthService {
  constructor(
    protected readonly userService: UsersService,
    protected readonly jwtService: JwtService,
    protected configService: ConfigService
  ) {}

  async validateUser(singinDto: SignInAuthDto): Promise<AccountInfo> {
    const { email, password } = singinDto
    const accountInfo = await this.userService.findUserWithEmail(email)
    
    if (!accountInfo) {
      throw new NotFoundException('User Not Found')
    }

    const passwordConfirm = await bcrypt.compare(
      password,
      accountInfo.password
    )

    if (!passwordConfirm) {
      throw new BadRequestException('Invalid credentials!')
    }

    const accountWithOutPSW = exclude(accountInfo, ['password'])
    return accountWithOutPSW
  }

  async generateAccessToken(user: AccountInfo): Promise<string> {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      userName: user.name
    }

    return this.jwtService.signAsync(payload)
  }

  async generateRefreshToken(user: AccountInfo): Promise<string> {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      userName: user.name
    }
    return this.jwtService.signAsync(
      { id: payload.id },
      {
        secret:
          this.configService.getOrThrow<AuthConfig>('auth').refresh.secret,
        expiresIn:
          this.configService.getOrThrow<AuthConfig>('auth').refresh.expireIn
      }
    )
  }

  async refresh(
    refreshTokenDto: RefreshTokenDto
  ): Promise<{ accessToken: string }> {
    const { refresh_token } = refreshTokenDto

    const decodedRefreshToken = this.jwtService.verify(refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET
    }) as Payload

    const userId = decodedRefreshToken.id
    const user = await this.userService.getUserIfRefreshTokenMatches(
      refresh_token,
      userId
    )
    if (!user) {
      throw new UnauthorizedException('Invalid user!')
    }

    const accessToken = await this.generateAccessToken(user)

    return { accessToken }
  }
}
