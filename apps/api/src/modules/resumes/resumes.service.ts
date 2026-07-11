import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ResumeParserService } from './parser/resume-parser.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ResumesService {
  private readonly logger = new Logger(ResumesService.name);

  constructor(
    private prisma: PrismaService,
    private parser: ResumeParserService,
  ) {}

  async uploadAndParse(file: Express.Multer.File, userId: string) {
    this.logger.log(`Upload: ${file.originalname} (${file.mimetype}, ${file.size} bytes) by user ${userId}`);

    // 1. Store original file
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const userDir = path.join(uploadDir, userId);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(userDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    this.logger.log(`File stored: ${filePath}`);

    // 2. Parse resume into canonical JSON
    const parsed = await this.parser.parse(file.buffer, file.mimetype, file.originalname);
    this.logger.log(`Parsed: ${parsed.personalInfo.fullName || 'Unknown'} | ${parsed.experience.length} exp | ${Object.values(parsed.skills).flat().length} skills`);

    // 3. Create resume record with canonical data
    const resume = await this.prisma.resume.create({
      data: {
        userId,
        title: parsed.personalInfo.fullName
          ? `${parsed.personalInfo.fullName} Resume`
          : file.originalname.replace(/\.[^.]+$/, ''),
        content: parsed as any,
        atsScore: 0,
        status: 'ACTIVE',
        pages: 1,
      },
    });

    // 4. Create initial version
    await this.prisma.resumeVersion.create({
      data: {
        resumeId: resume.id,
        version: 1,
        content: parsed as any,
        changes: 'Initial upload and parse',
      },
    });

    this.logger.log(`Resume created: ${resume.id}`);

    return {
      id: resume.id,
      title: resume.title,
      content: parsed,
      originalFile: fileName,
      fileType: file.mimetype,
      fileSize: file.size,
      createdAt: resume.createdAt,
    };
  }

  async findAll(userId: string, filters: { search?: string; sort?: string; favorite?: boolean }) {
    const where: any = { userId, isArchived: false };
    if (filters.favorite) where.isFavorite = true;
    if (filters.search) {
      where.title = { contains: filters.search, mode: 'insensitive' };
    }

    const orderBy: any = filters.sort === 'name'
      ? { title: 'asc' }
      : filters.sort === 'score'
        ? { atsScore: 'desc' }
        : { updatedAt: 'desc' };

    return this.prisma.resume.findMany({
      where,
      orderBy,
      select: {
        id: true, title: true, atsScore: true, status: true,
        pages: true, isFavorite: true, tags: true,
        createdAt: true, updatedAt: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) throw new NotFoundException('Resume not found');
    if (resume.userId !== userId) throw new ForbiddenException();
    return resume;
  }

  async update(id: string, userId: string, data: any) {
    const resume = await this.findOne(id, userId);
    const versionCount = await this.prisma.resumeVersion.count({ where: { resumeId: id } });

    // Create new version
    await this.prisma.resumeVersion.create({
      data: {
        resumeId: id,
        version: versionCount + 1,
        content: data.content || resume.content,
        changes: data.changeDescription || 'Manual edit',
      },
    });

    return this.prisma.resume.update({
      where: { id },
      data: {
        title: data.title || resume.title,
        content: data.content || resume.content,
        templateId: data.templateId,
        tags: data.tags,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.prisma.resumeVersion.deleteMany({ where: { resumeId: id } });
    await this.prisma.resume.delete({ where: { id } });
    return { message: 'Resume deleted' };
  }

  async duplicate(id: string, userId: string) {
    const original = await this.findOne(id, userId);
    const newResume = await this.prisma.resume.create({
      data: {
        userId,
        title: `${original.title} (Copy)`,
        content: original.content as any,
        atsScore: original.atsScore,
        status: 'DRAFT',
        pages: original.pages,
        tags: original.tags,
      },
    });
    await this.prisma.resumeVersion.create({
      data: { resumeId: newResume.id, version: 1, content: original.content as any, changes: 'Duplicated' },
    });
    return newResume;
  }

  async toggleFavorite(id: string, userId: string) {
    const resume = await this.findOne(id, userId);
    return this.prisma.resume.update({ where: { id }, data: { isFavorite: !resume.isFavorite } });
  }

  async toggleArchive(id: string, userId: string) {
    const resume = await this.findOne(id, userId);
    return this.prisma.resume.update({ where: { id }, data: { isArchived: !resume.isArchived } });
  }

  async getVersions(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.resumeVersion.findMany({ where: { resumeId: id }, orderBy: { version: 'desc' } });
  }

  async restoreVersion(id: string, versionId: string, userId: string) {
    await this.findOne(id, userId);
    const version = await this.prisma.resumeVersion.findUnique({ where: { id: versionId } });
    if (!version || version.resumeId !== id) throw new NotFoundException('Version not found');

    const versionCount = await this.prisma.resumeVersion.count({ where: { resumeId: id } });
    await this.prisma.resumeVersion.create({
      data: { resumeId: id, version: versionCount + 1, content: version.content as any, changes: `Restored from v${version.version}` },
    });

    return this.prisma.resume.update({ where: { id }, data: { content: version.content as any } });
  }
}
