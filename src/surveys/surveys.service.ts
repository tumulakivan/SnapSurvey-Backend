import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, SurveyDocument } from './surveys.schema';
import { Model } from 'mongoose';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
  ) {}

  async create(data: Partial<Survey>): Promise<Survey> {
    const created = new this.surveyModel(data);
    return created.save();
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.find().exec();
  }
}
