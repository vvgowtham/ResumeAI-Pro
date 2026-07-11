import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ResumesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.resume.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) throw new NotFoundException('Resume not found');
    return resume;
  }

  async create(data: any) {
    return this.prisma.resume.create({ data });
  }

  async parseUpload(file: Express.Multer.File) {
    if (!file) throw new NotFoundException('No file uploaded');
    return {
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      parsed: true,
    };
  }

  async update(id: string, data: any) {
    return this.prisma.resume.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.resume.delete({ where: { id } });
  }
}
