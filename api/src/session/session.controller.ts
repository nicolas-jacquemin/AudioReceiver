import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }
}
