import { CatResponseDto } from './dto/response/read-cat.dto';
import { SuccessInterceptor } from './../common/interceptor/success.interceptor';
import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatRequestDto } from './dto/request/create-cat.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500, 
    description: 'Server error...'
  })
  @ApiResponse({
    status: 200, 
    description: '성공!', 
    type: CatResponseDto
  })
  @Post()
  async signUp(@Body() createRequest: CreateCatRequestDto) {
    return await this.catsService.signUp(createRequest);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
