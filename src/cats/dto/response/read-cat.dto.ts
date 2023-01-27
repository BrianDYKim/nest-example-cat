import { Cat } from './../../entities/cat.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CatResponseDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '328qwe',
    description: 'id',
  })
  id: string;
}
