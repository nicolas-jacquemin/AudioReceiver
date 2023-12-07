import { Injectable, NotFoundException } from '@nestjs/common';
import { AirplayService } from 'src/services/airplay/airplay.service';

@Injectable()
export class SessionService {

  constructor(private airplayService: AirplayService) {}

  findAll() {
    if (this.airplayService.getSession().state !== 'closed')
      return this.airplayService.getSummary();

    return {}
  }

  findOne(id: string) {
    switch (id) {
      case 'airplay':
        return this.airplayService.getSummary();
      default:
        throw new NotFoundException();
    }
  }
}
