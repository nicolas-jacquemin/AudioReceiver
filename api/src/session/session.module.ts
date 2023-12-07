import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { AirplayService } from 'src/services/airplay/airplay.service';

@Module({
  controllers: [SessionController],
  providers: [
    AirplayService,
    SessionService,
  ],
})
export class SessionModule {}
