import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Thread API Documentation')
    .setDescription('API documentation for the Thread application')
    .setVersion('1.0')
    .addTag('Threads')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  await app.listen(process.env.PORT ?? "0.0.0.0");
}
bootstrap();
