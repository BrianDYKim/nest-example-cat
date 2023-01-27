import { CreateCatRequestDto } from './dto/request/create-cat.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result: boolean =
      (await this.catModel.findOne({ email })) !== null ? true : false;
    return result;
  }

  async findByIdWithoutPassword(id: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(id).select('-password');
    return cat;
  }

  async create(cat: CreateCatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
