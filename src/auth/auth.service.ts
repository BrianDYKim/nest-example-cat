import { LoginRequestDto } from './jwt/dto/login.request';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(loginRequest: LoginRequestDto) {
    const { email, password } = loginRequest;

    // 해당하는 이메일이 존재하는가?
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번홍를 확인해주세요.');
    }

    // password 검사
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번홍를 확인해주세요.');
    }

    const payload = { email: email, sub: cat.id };

    return {
        token: this.jwtService.sign(payload)
    };
  }
}
