import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurveyDocument = Survey & Document;

@Schema({ timestamps: true })
export class Survey {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
