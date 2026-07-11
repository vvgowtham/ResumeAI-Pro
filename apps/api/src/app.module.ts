import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { ResumesModule } from './modules/resumes/resumes.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { AtsModule } from './modules/ats/ats.module';
import { AiModule } from './modules/ai/ai.module';
import { ExportModule } from './modules/export/export.module';
import { JobMatchModule } from './modules/job-match/job-match.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ResumesModule,
    TemplatesModule,
    AtsModule,
    AiModule,
    ExportModule,
    JobMatchModule,
  ],
})
export class AppModule {}
