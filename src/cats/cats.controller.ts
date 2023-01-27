import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/jwt/dto/login.request';
import { AuthService } from './../auth/auth.service';
import { CatResponseDto } from './dto/response/read-cat.dto';
import { SuccessInterceptor } from './../common/interceptor/success.interceptor';
import { Controller, Get, Post, Body, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatRequestDto } from './dto/request/create-cat.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentCat(@CurrentUser() currentCat) {
    return currentCat.readOnlyData;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: CatResponseDto,
  })
  @Post()
  async signUp(@Body() createRequest: CreateCatRequestDto) {
    return await this.catsService.signUp(createRequest);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() loginRequest: LoginRequestDto) {
    return this.authService.jwtLogin(loginRequest);
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
