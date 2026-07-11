import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('providers')
  @ApiOperation({ summary: 'Get all configured AI providers' })
  async getProviders() {
    return this.aiService.getProviders();
  }

  @Post('providers')
  @ApiOperation({ summary: 'Add a new AI provider' })
  async addProvider(@Body() body: any) {
    return this.aiService.addProvider(body);
  }

  @Post('providers/:id/test')
  @ApiOperation({ summary: 'Test AI provider connection' })
  async testProvider(@Param('id') id: string) {
    return this.aiService.testConnection(id);
  }

  @Post('optimize')
  @ApiOperation({ summary: 'AI optimize resume content' })
  async optimize(@Body() body: { resumeId: string; action: string }) {
    return this.aiService.optimize(body);
  }
}
