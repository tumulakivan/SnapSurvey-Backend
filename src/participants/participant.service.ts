import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant, ParticipantDocument } from './participant.schema';
import { Model } from 'mongoose';
import { CreateParticipantDTO } from './createParticipant.dto';

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

  async findAll(): Promise<Participant[]> {
    return this.participantModel.find().exec();
  }

  async findById(id: string): Promise<Participant> {
    const participant = await this.participantModel.findById(id).exec();

    if (!participant)
      throw new NotFoundException(`Participant with ID: ${id} not found.`);

    return participant;
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
