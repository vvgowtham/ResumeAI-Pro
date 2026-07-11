import { Controller, Get, Param, Query, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TemplatesService } from './templates.service';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly service: TemplatesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all templates with optional filters' })
  async findAll(@Query('category') category?: string, @Query('search') search?: string) {
    return this.service.findAll({ category, search });
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get template categories' })
  getCategories() {
    return this.service.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get template by ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post(':id/favorite')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle template favorite' })
  async toggleFavorite(@Param('id') id: string, @Request() req: any) {
    return this.service.toggleFavorite(id, req.user.id);
  }
}
