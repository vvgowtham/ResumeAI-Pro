import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { ResumeParserService } from './parser/resume-parser.service';
import { ExportService } from './export/export.service';

@Module({
  imports: [
    MulterModule.register({
      storage: undefined, // Use memory storage (buffer available on file)
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  ],
  controllers: [ResumesController],
  providers: [ResumesService, ResumeParserService, ExportService],
  exports: [ResumesService],
})
export class ResumesModule {}
