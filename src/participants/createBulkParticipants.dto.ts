import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateParticipantDTO } from './createParticipant.dto';

export class CreateBulkParticipantsDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateParticipantDTO)
  participants: CreateParticipantDTO[];
}
