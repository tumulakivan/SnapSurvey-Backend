import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateSurveyDTO } from './createSurvey.dto';

export class CreateBulkSurveysDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateSurveyDTO)
  surveys: CreateSurveyDTO[];
}
