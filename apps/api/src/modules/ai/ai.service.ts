import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async getProviders() {
    return this.prisma.aiProvider.findMany();
  }

  async addProvider(data: any) {
    // Encrypt API key before storing
    return this.prisma.aiProvider.create({ data });
  }

  async testConnection(id: string) {
    const provider = await this.prisma.aiProvider.findUnique({ where: { id } });
    if (!provider) throw new Error('Provider not found');

    try {
      const client = new OpenAI({
        apiKey: provider.apiKey,
        baseURL: provider.baseUrl || undefined,
      });

      const response = await client.chat.completions.create({
        model: provider.model,
        messages: [{ role: 'user', content: 'Say hello' }],
        max_tokens: 10,
      });

      return { status: 'connected', message: 'Connection successful' };
    } catch (error) {
      return { status: 'failed', message: 'Connection failed' };
    }
  }

  async optimize(data: { resumeId: string; action: string }) {
    const defaultProvider = await this.prisma.aiProvider.findFirst({
      where: { isDefault: true },
    });

    if (!defaultProvider) throw new Error('No default AI provider configured');

    const client = new OpenAI({
      apiKey: defaultProvider.apiKey,
      baseURL: defaultProvider.baseUrl || undefined,
    });

    const resume = await this.prisma.resume.findUnique({ where: { id: data.resumeId } });

    const response = await client.chat.completions.create({
      model: defaultProvider.model,
      messages: [
        { role: 'system', content: defaultProvider.systemPrompt || 'You are a professional resume optimizer.' },
        { role: 'user', content: `Action: ${data.action}\n\nResume: ${JSON.stringify(resume?.content)}` },
      ],
      temperature: defaultProvider.temperature || 0.7,
      max_tokens: defaultProvider.maxTokens || 4096,
    });

    return { result: response.choices[0]?.message?.content };
  }
}
