import { CreateCatRequestDto } from './create-cat.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCatRequestDto extends PartialType(CreateCatRequestDto) {}
