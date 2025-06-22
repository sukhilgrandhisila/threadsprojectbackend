import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { AuthService } from './auth.service';
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) response: Response,
    ) {
    const { access_token } = await this.authService.signIn(
    signInDto.username,
    signInDto.password,
    );
    response.cookie('jwt', access_token, {
    httpOnly: true, // Prevents access from JS
    secure: false, // Set true if using HTTPS
    });
    return { access_token };
    }
    @Get('profile')
    getProfile(@Request() req) {
    return req.user; // Retrieved from AuthGuard
    }
    }