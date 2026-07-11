import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ResumesService } from './resumes.service';

@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resumes for current user' })
  async findAll() {
    return this.resumesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resume by ID' })
  async findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new resume' })
  async create(@Body() body: any) {
    return this.resumesService.create(body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload and parse a resume file' })
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.resumesService.parseUpload(file);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update resume' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.resumesService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete resume' })
  async remove(@Param('id') id: string) {
    return this.resumesService.remove(id);
  }
}
