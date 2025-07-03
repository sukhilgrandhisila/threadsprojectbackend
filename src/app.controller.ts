import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('app Routes')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get hello' ,description: 'Get hello' })
  @ApiResponse({ status: 200, description: 'Hello fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Hello not found' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

