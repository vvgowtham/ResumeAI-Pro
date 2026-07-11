import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ResumesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.resume.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { versions: { take: 1, orderBy: { createdAt: 'desc' } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.resume.findUnique({
      where: { id },
      include: { versions: true },
    });
  }

  async create(data: any) {
    return this.prisma.resume.create({ data });
  }

  async parseUpload(file: Express.Multer.File) {
    // Parse PDF/DOCX/TXT and extract structured data
    const content = file.buffer.toString('utf-8');
    return {
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      parsedContent: content,
    };
  }

  async update(id: string, data: any) {
    return this.prisma.resume.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.resume.delete({ where: { id } });
  }
}
