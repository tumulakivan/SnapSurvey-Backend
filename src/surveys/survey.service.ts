import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, SurveyDocument } from './survey.schema';
import { Model, Types } from 'mongoose';
import { CreateSurveyDTO } from './createSurvey.dto';
import { TransformedSurvey } from 'src/types/TransformedSurvey';

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

  async findAll() {
    const surveys = await this.surveyModel.find().lean().exec();
    const transformSurveys = surveys.map((survey) => {
      const { _id, name, description } = survey;

      return {
        ID: _id,
        Name: name,
        Description: description,
      };
    });

    return transformSurveys;
  }

  async findById(id: string): Promise<TransformedSurvey> {
    const survey = await this.surveyModel.findById(id).exec();

    if (!survey)
      throw new NotFoundException(`Survey with ID: ${id} not found.`);

    const { name, description } = survey;

    return {
      ID: (survey._id as Types.ObjectId).toString(),
      Name: name,
      Description: description,
    };
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
