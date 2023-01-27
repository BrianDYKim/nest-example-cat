import { Cat } from './../../entities/cat.schema';
import { PickType } from '@nestjs/swagger';

export class CreateCatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
