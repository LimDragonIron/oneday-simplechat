import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsModule } from './events/events.module'
import { AuthModule } from './auth/auth.module'
import { GlobalModule } from './config/global.module'

@Module({
  imports: [GlobalModule, EventsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
