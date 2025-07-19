import { IsArray, IsString } from 'class-validator';

export class CreateParticipantDTO {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsArray()
  surveys?: string[];
}
