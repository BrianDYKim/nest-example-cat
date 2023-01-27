import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  // REST Config
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 보안 처리
  app.use(
    ['/docs', 'docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // Documentation config
  const documentConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('Document for cats example')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    documentConfig,
  );
  SwaggerModule.setup('docs', app, document);

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
