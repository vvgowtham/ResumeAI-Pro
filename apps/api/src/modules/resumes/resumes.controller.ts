import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResumesService } from './resumes.service';

@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly service: ResumesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resumes' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resume by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create resume' })
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload and parse resume' })
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.service.parseUpload(file);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update resume' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete resume' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
