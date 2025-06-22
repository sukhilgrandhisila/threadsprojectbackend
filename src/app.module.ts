import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { RateLimitMiddleware } from 'rate-limit-middleware/rate-limit-middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sukhil:Ty2uaBOn43ukKVuc@cluster0.8bt6bsa.mongodb.net/database'),
    UserModule,CommentsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, RateLimitMiddleware)
      .forRoutes('*','*');
  }
}
