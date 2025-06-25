import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { RateLimitMiddleware } from 'rate-limit-middleware/rate-limit-middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './login/login.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        }),
    }), 
    UserModule,CommentsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggingInterceptor],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, RateLimitMiddleware)
      .forRoutes('*','*');
  }
}
