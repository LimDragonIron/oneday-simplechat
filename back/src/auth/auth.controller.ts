import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { Public } from 'src/utils'
import { SignInAuthDto } from './dto/signin-auth.dto'
import { RefreshTokenDto } from './dto/refresh.dto'
import { JwtRefreshGuard } from './jwt-refresh.guard'
import { UsersService } from 'src/users/users.service'
import { JwtAccessAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('signin')
  async singin(
    @Body() signInAuthDto: SignInAuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const user = await this.authService.validateUser(signInAuthDto)
    const access_token = await this.authService.generateAccessToken(user)
    const refresh_token = await this.authService.generateRefreshToken(user)
    
    await this.userService.setCurrentRefreshToken(refresh_token, user.id)

    res.setHeader('Authorization', 'Bearer ' + [access_token, refresh_token])
    res.cookie('access_token', access_token, {
      httpOnly: true
    })
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true
    })
    const data = {
     
      access_token: access_token,
      refresh_token: refresh_token
    }

    return {
      status:200,
      data:data,
      message: 'login success',
    }
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const newAccessToken = (await this.authService.refresh(refreshTokenDto))
        .accessToken
      res.setHeader('Authorization', 'Bearer ' + newAccessToken)
      res.cookie('access_token', newAccessToken, {
        httpOnly: true
      })
      return res.send({ newAccessToken })
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh-token')
    }
  }

  @Get('user')
  @UseGuards(JwtAccessAuthGuard)
  async user(@Req() req: any, @Res() res: Response): Promise<any> {
    const userId = req.user.id
    const validateUser = await this.userService.findUserWithId(userId)
    return res.send(validateUser)
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    await this.userService.removeRefreshToken(req.user.id)
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    return res.send({
      message: 'logout success'
    })
  }
}
