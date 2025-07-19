import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveysSchema } from './surveys.schema';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveysSchema }]),
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
