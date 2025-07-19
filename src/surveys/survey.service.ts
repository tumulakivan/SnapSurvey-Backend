import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, SurveyDocument } from './survey.schema';
import { Model } from 'mongoose';
import { CreateSurveyDTO } from './createSurvey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
  ) {}

  async create(data: Partial<Survey>): Promise<Survey> {
    const created = new this.surveyModel(data);
    return created.save();
  }

  async createMany(dto: CreateSurveyDTO[]): Promise<Survey[]> {
    return this.surveyModel.insertMany(dto);
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.find().exec();
  }

  async findById(id: string): Promise<Survey> {
    const survey = await this.surveyModel.findById(id).exec();

    if (!survey)
      throw new NotFoundException(`Survey with ID: ${id} not found.`);

    return survey;
  }

  async patchById(id: string, updates: Partial<Survey>): Promise<Survey> {
    const updatedSurvey = await this.surveyModel
      .findByIdAndUpdate(id, updates, { new: true, runValidators: true })
      .exec();

    if (!updatedSurvey)
      throw new NotFoundException(`Survey with Id: ${id} not found.`);

    return updatedSurvey;
  }
}
