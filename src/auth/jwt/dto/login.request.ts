import { Cat } from './../../../cats/entities/cat.schema';
import { PickType } from '@nestjs/swagger';
export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
