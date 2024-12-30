import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthConfig } from 'src/config'
import { PassportModule } from '@nestjs/passport'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow<AuthConfig>('auth').access.secret,
        signOptions: {
          expiresIn:
            configService.getOrThrow<AuthConfig>('auth').access.expireIn
        }
      })
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy]
})
export class AuthModule {}
