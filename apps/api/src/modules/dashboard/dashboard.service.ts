import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: string) {
    const [totalResumes, recentResumes, downloads] = await Promise.all([
      this.prisma.resume.count({ where: { userId, isArchived: false } }),
      this.prisma.resume.findMany({
        where: { userId, isArchived: false },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: { id: true, title: true, atsScore: true, updatedAt: true },
      }),
      this.prisma.download.count({ where: { userId } }),
    ]);

    // Calculate average ATS score
    const resumesWithScore = await this.prisma.resume.findMany({
      where: { userId, atsScore: { gt: 0 } },
      select: { atsScore: true },
    });
    const avgAts = resumesWithScore.length > 0
      ? Math.round(resumesWithScore.reduce((sum, r) => sum + r.atsScore, 0) / resumesWithScore.length)
      : 0;

    return {
      totalResumes,
      avgAtsScore: avgAts,
      jobMatches: 0,
      downloads,
      recentResumes,
    };
  }
}
