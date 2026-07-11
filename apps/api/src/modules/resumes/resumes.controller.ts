import {
  Controller, Get, Post, Put, Delete, Param, Body,
  UseGuards, UseInterceptors, UploadedFile, Request, Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResumesService } from './resumes.service';

@ApiTags('resumes')
@Controller('resumes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResumesController {
  constructor(private readonly service: ResumesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload and parse a resume file (PDF, DOCX, TXT, HTML)' })
  async upload(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
    if (!file) throw new BadRequestException('No file provided');
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/html', 'application/msword'];
    if (!allowed.includes(file.mimetype) && !file.originalname.match(/\.(pdf|docx?|txt|html|rtf)$/i)) {
      throw new BadRequestException('Unsupported file format. Supported: PDF, DOCX, DOC, TXT, HTML');
    }
    return this.service.uploadAndParse(file, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resumes for current user' })
  async findAll(@Request() req: any, @Query('search') search?: string, @Query('sort') sort?: string, @Query('favorite') favorite?: string) {
    return this.service.findAll(req.user.id, { search, sort, favorite: favorite === 'true' });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resume by ID with full canonical data' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.service.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update resume content (creates new version automatically)' })
  async update(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.service.update(id, req.user.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete resume' })
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.service.remove(id, req.user.id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a resume' })
  async duplicate(@Param('id') id: string, @Request() req: any) {
    return this.service.duplicate(id, req.user.id);
  }

  @Post(':id/favorite')
  @ApiOperation({ summary: 'Toggle favorite status' })
  async toggleFavorite(@Param('id') id: string, @Request() req: any) {
    return this.service.toggleFavorite(id, req.user.id);
  }

  @Post(':id/archive')
  @ApiOperation({ summary: 'Archive/unarchive resume' })
  async toggleArchive(@Param('id') id: string, @Request() req: any) {
    return this.service.toggleArchive(id, req.user.id);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Get version history for a resume' })
  async getVersions(@Param('id') id: string, @Request() req: any) {
    return this.service.getVersions(id, req.user.id);
  }

  @Post(':id/versions/:versionId/restore')
  @ApiOperation({ summary: 'Restore a specific version' })
  async restoreVersion(@Param('id') id: string, @Param('versionId') versionId: string, @Request() req: any) {
    return this.service.restoreVersion(id, versionId, req.user.id);
  }
}
