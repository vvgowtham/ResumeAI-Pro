import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly service: AiService) {}

  @Get('providers')
  @ApiOperation({ summary: 'Get all configured AI providers' })
  getProviders() {
    return this.service.getProviders();
  }

  @Post('providers')
  @ApiOperation({ summary: 'Add AI provider' })
  addProvider(@Body() body: any) {
    return this.service.addProvider(body);
  }

  @Post('providers/:id/test')
  @ApiOperation({ summary: 'Test AI provider connection' })
  testProvider(@Param('id') id: string) {
    return this.service.testConnection(id);
  }

  @Post('optimize')
  @ApiOperation({ summary: 'AI optimize resume' })
  optimize(@Body() body: { resumeId: string; action: string }) {
    return this.service.optimize(body);
  }
}
