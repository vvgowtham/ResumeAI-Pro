import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: { category?: string; search?: string }) {
    const where: any = { isActive: true };
    if (filters.category) {
      where.category = filters.category === 'ats' ? 'ATS_FRIENDLY' : 'ATTRACTIVE';
    }
    if (filters.search) {
      where.name = { contains: filters.search, mode: 'insensitive' };
    }
    return this.prisma.template.findMany({ where, orderBy: { name: 'asc' } });
  }

  getCategories() {
    return [
      { id: 'ats', name: 'ATS Friendly', count: 25 },
      { id: 'attractive', name: 'Attractive', count: 25 },
    ];
  }

  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async toggleFavorite(templateId: string, userId: string) {
    // Store in user preferences (simplified: just return success)
    return { favorited: true, templateId };
  }
}
