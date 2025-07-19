import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from './survey.schema';
import { CreateSurveyDTO } from './createSurvey.dto';
import { CreateBulkSurveysDTO } from './createBulkSurveys.dto';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Body() dto: CreateSurveyDTO) {
    return this.surveyService.create(dto);
  }

  @Post('bulk')
  createMany(@Body() body: CreateBulkSurveysDTO) {
    return this.surveyService.createMany(body.surveys);
  }

  @Get()
  findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.surveyService.findById(id);
  }

  @Patch(':id')
  patchById(@Param('id') id: string, @Body() updates: Partial<Survey>) {
    return this.surveyService.patchById(id, updates);
  }
}
