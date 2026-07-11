import {
  Controller, Get, Post, Put, Delete, Param, Body,
  UseGuards, UseInterceptors, UploadedFile, Request, Query,
  BadRequestException, Res, Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResumesService } from './resumes.service';
import { ExportService } from './export/export.service';
import { Response } from 'express';

@ApiTags('resumes')
@Controller('resumes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResumesController {
  constructor(
    private readonly service: ResumesService,
    private readonly exportService: ExportService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload and parse a resume file' })
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  async upload(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
    if (!file) {
      throw new BadRequestException('No file provided. Send a file with field name "file".');
    }
    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('File is empty.');
    }
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/html',
      'application/rtf',
    ];
    const allowedExts = /\.(pdf|docx?|txt|html?|rtf)$/i;
    if (!allowedMimes.includes(file.mimetype) && !allowedExts.test(file.originalname)) {
      throw new BadRequestException(`Unsupported format: ${file.mimetype}. Use PDF, DOCX, DOC, TXT, or HTML.`);
    }
    return this.service.uploadAndParse(file, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all resumes for current user' })
  async findAll(
    @Request() req: any,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('favorite') favorite?: string,
  ) {
    return this.service.findAll(req.user.id, { search, sort, favorite: favorite === 'true' });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resume by ID' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.service.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update resume (auto-creates version)' })
  async update(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.service.update(id, req.user.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete resume' })
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.service.remove(id, req.user.id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate resume' })
  async duplicate(@Param('id') id: string, @Request() req: any) {
    return this.service.duplicate(id, req.user.id);
  }

  @Post(':id/favorite')
  @ApiOperation({ summary: 'Toggle favorite' })
  async toggleFavorite(@Param('id') id: string, @Request() req: any) {
    return this.service.toggleFavorite(id, req.user.id);
  }

  @Post(':id/archive')
  @ApiOperation({ summary: 'Toggle archive' })
  async toggleArchive(@Param('id') id: string, @Request() req: any) {
    return this.service.toggleArchive(id, req.user.id);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Get version history' })
  async getVersions(@Param('id') id: string, @Request() req: any) {
    return this.service.getVersions(id, req.user.id);
  }

  @Post(':id/versions/:versionId/restore')
  @ApiOperation({ summary: 'Restore version' })
  async restoreVersion(@Param('id') id: string, @Param('versionId') versionId: string, @Request() req: any) {
    return this.service.restoreVersion(id, versionId, req.user.id);
  }

  @Get(':id/export/:format')
  @ApiOperation({ summary: 'Export resume as HTML/JSON/Markdown' })
  async exportResume(
    @Param('id') id: string,
    @Param('format') format: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const resume = await this.service.findOne(id, req.user.id);
    const result = this.exportService.export(resume, format);

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.title}.json"`);
      return res.send(JSON.stringify(resume.content, null, 2));
    }

    if (format === 'html') {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.title}.html"`);
      return res.send(result);
    }

    if (format === 'markdown' || format === 'md') {
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.title}.md"`);
      return res.send(result);
    }

    // For PDF/DOCX/PNG - return instruction (needs Puppeteer in production)
    res.setHeader('Content-Type', 'application/json');
    return res.json({ message: `${format.toUpperCase()} export requires server-side rendering. Use HTML export and convert.`, htmlContent: result });
  }
}
