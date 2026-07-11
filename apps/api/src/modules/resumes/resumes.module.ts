import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { ResumeParserService } from './parser/resume-parser.service';

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  ],
  controllers: [ResumesController],
  providers: [ResumesService, ResumeParserService],
  exports: [ResumesService],
})
export class ResumesModule {}
