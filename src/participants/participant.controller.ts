import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDTO } from './createParticipant.dto';
import { CreateBulkParticipantsDTO } from './createBulkParticipants.dto';
import { Participant } from './participant.schema';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  create(@Body() dto: CreateParticipantDTO) {
    return this.participantService.create(dto);
  }

  @Post('bulk')
  createMany(@Body() body: CreateBulkParticipantsDTO) {
    return this.participantService.createMany(body.participants);
  }

  @Get()
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.participantService.findById(id);
  }

  @Patch(':id')
  patchById(@Param('id') id: string, @Body() updates: Partial<Participant>) {
    return this.participantService.patchById(id, updates);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.participantService.deleteById(id);
  }
}
