import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { Survey } from './surveys.schema';
import { CreateSurveyDTO } from './createSurvey.dto';
import { CreateBulkSurveysDTO } from './createBulkSurveys.dto';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() dto: CreateSurveyDTO) {
    return this.surveysService.create(dto);
  }

  @Post('bulk')
  createMany(@Body() body: CreateBulkSurveysDTO) {
    return this.surveysService.createMany(body.surveys);
  }

  @Get()
  findAll() {
    return this.surveysService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.surveysService.findById(id);
  }

  @Patch(':id')
  patchById(@Param('id') id: string, @Body() updates: Partial<Survey>) {
    return this.surveysService.patchById(id, updates);
  }
}
