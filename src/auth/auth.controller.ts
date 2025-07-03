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
  import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
  @ApiTags('auth Routes')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login' ,description: 'Login with the given username and password' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiBody({ type: CreateAuthDto })
    @Post('login')
    async signIn(
    @Body() signInDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
    ) {
    const { access_token } = await this.authService.signIn(
    signInDto.email,
    signInDto.password,
    );
    response.cookie('jwt', access_token, {
    httpOnly: true, // Prevents access from JS
    secure: false, // Set true if using HTTPS
    });
    return { access_token };
    }
    @ApiOperation({ summary: 'Get profile' ,description: 'Get profile' })
    @ApiResponse({ status: 200, description: 'Profile fetched successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'Profile not found' })
    @Get('profile')
    getProfile(@Request() req) {
    return req.user; // Retrieved from AuthGuard
    }
    }