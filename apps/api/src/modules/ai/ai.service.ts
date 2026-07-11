import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async getProviders() {
    return this.prisma.aiProvider.findMany({
      select: {
        id: true,
        name: true,
        provider: true,
        model: true,
        baseUrl: true,
        temperature: true,
        maxTokens: true,
        isDefault: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async addProvider(data: any) {
    return this.prisma.aiProvider.create({ data });
  }

  async testConnection(id: string) {
    const provider = await this.prisma.aiProvider.findUnique({ where: { id } });
    if (!provider) throw new NotFoundException('Provider not found');

    try {
      const client = new OpenAI({
        apiKey: provider.apiKey,
        baseURL: provider.baseUrl || undefined,
      });

      await client.chat.completions.create({
        model: provider.model,
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 5,
      });

      return { status: 'connected', message: 'Connection successful' };
    } catch {
      return { status: 'failed', message: 'Connection failed' };
    }
  }

  async optimize(data: { resumeId: string; action: string }) {
    const provider = await this.prisma.aiProvider.findFirst({ where: { isDefault: true } });
    if (!provider) return { error: 'No default AI provider configured. Add one in AI Studio.' };

    const resume = await this.prisma.resume.findUnique({ where: { id: data.resumeId } });
    if (!resume) throw new NotFoundException('Resume not found');

    const client = new OpenAI({
      apiKey: provider.apiKey,
      baseURL: provider.baseUrl || undefined,
    });

    const response = await client.chat.completions.create({
      model: provider.model,
      messages: [
        { role: 'system', content: provider.systemPrompt || 'You are a professional resume optimizer.' },
        { role: 'user', content: `Action: ${data.action}\nResume: ${JSON.stringify(resume.content)}` },
      ],
      temperature: provider.temperature || 0.7,
      max_tokens: provider.maxTokens || 4096,
    });

    return { result: response.choices[0]?.message?.content };
  }
}
