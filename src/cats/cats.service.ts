import { AuthService } from './../auth/auth.service';
import { CatsRepository } from './cats.repository';
import { Cat } from './entities/cat.schema';
import { CreateCatRequestDto } from './dto/request/create-cat.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly authService: AuthService,
  ) {}

  async signUp(createRequest: CreateCatRequestDto) {
    const { email, name, password } = createRequest;
    const isAlreadyExists = await this.catsRepository.existsByEmail(email);

    if (isAlreadyExists) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다');
    }

    // Password Salting
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newCat: Cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return newCat.readOnlyData;
  }
}
