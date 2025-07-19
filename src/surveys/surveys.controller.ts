import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { Survey } from './surveys.schema';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() data: Partial<Survey>) {
    return this.surveysService.create(data);
  }

  @Get()
  findAll() {
    return this.surveysService.findAll();
  }
}
