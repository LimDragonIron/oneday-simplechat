import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'
import { Payload } from 'src/payload/payload.interface'
import { Request } from 'express'
import { AccountInfo } from 'src/types'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        request => {
          return request?.cookies?.refresh_token
        }
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true
    })
  }

  async validate(req: Request, payload: Payload) {
    const refreshToken = req.cookies['refresh_token']
    const user: AccountInfo =
      await this.userService.getUserIfRefreshTokenMatches(
        refreshToken,
        payload.id
      )
    return user
  }
}
