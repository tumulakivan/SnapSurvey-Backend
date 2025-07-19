import { IsString } from 'class-validator';

export class CreateSurveyDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
