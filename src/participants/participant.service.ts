import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant, ParticipantDocument } from './participant.schema';
import { Model, Types } from 'mongoose';
import { CreateParticipantDTO } from './createParticipant.dto';
import { TransformedParticipant } from 'src/types/TransformedParticipant';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
  ) {}

  async create(data: Partial<Participant>): Promise<Participant> {
    const created = new this.participantModel(data);
    return created.save();
  }

  async createMany(dto: CreateParticipantDTO[]): Promise<Participant[]> {
    return this.participantModel.insertMany(dto);
  }

  async findAll() {
    const participants = await this.participantModel.find().lean().exec();
    const transformParticipants = participants.map((participant) => {
      const { _id, firstName, lastName, email, surveys } = participant;

      return {
        ID: _id,
        'First Name': firstName,
        'Last Name': lastName,
        'E-mail': email,
        Surveys: surveys,
      };
    });

    return transformParticipants;
  }

  async findById(id: string): Promise<TransformedParticipant> {
    const participant = await this.participantModel.findById(id).lean().exec();

    if (!participant)
      throw new NotFoundException(`Participant with ID: ${id} not found.`);

    const { firstName, lastName, email, surveys } = participant;

    return {
      ID: (participant._id as Types.ObjectId).toString(),
      'First Name': firstName,
      'Last Name': lastName,
      'E-mail': email,
      Surveys: surveys,
    };
  }

  async patchById(
    id: string,
    updates: Partial<Participant>,
  ): Promise<Participant> {
    const updatedParticipant = await this.participantModel
      .findByIdAndUpdate(id, updates, { new: true, runValidators: true })
      .exec();

    if (!updatedParticipant)
      throw new NotFoundException(`Participant with ID: ${id} not found.`);

    return updatedParticipant;
  }

  async deleteById(id: string): Promise<void> {
    const toDelete = await this.participantModel.findByIdAndDelete(id).exec();

    if (!toDelete)
      throw new NotFoundException(`Participant with ID: ${id} not found.`);
  }
}
