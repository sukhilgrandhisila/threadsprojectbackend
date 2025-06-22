import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { jwtConstants } from './constants';
  @Injectable()
  export class AuthGuard implements CanActivate {
  constructor(
  private jwtService: JwtService,
  private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
    throw new UnauthorizedException();
    }
    try {
    const payload = await this.jwtService.verifyAsync(token, {
    secret: jwtConstants.secret,
    });
    request['user'] = payload; // Attach payload to request
    } catch {
    throw new UnauthorizedException();
    }
    return true;
    }
    private extractToken(request: Request): string | undefined {
    // 1. Try Authorization header
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) return token;
    // 2. Fallback to Cookie
    return request.cookies?.jwt;
    }
    }